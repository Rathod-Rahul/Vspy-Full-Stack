const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const queryDb = require("../utils/DBhelper");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
// Registration controller function
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUser = await queryDb(checkUserQuery, [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const insertUserQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const insertedUser = await queryDb(insertUserQuery, [
      username,
      email,
      hashedPassword,
    ]);

    // Generate JWT token
    const token = jwt.sign(
      { userId: insertedUser.insertId, username, email },
      "rathodrahul",
      { expiresIn: "1h" }
    );

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    // Redirect to login page
    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ===============================================

// Login controller function
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const user = await queryDb(checkUserQuery, [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user[0].id, username: user[0].username, email },
      "rathodrahul",
      { expiresIn: "1h" }
    );

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    // Redirect to the dashboard page after successful login
    res.redirect("/dashboard");
    // res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// Logout
function logout(req, res) {
  // Clear the token cookie
  res.clearCookie("token");

  // Redirect to the login page or any other desired page after logout
  res.redirect("/login");
}

// forgot password
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    console.log(email);
    // Basic input validation
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const user = await queryDb(checkUserQuery, [email]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token
    const token = jwt.sign({ userId: user[0].id }, "rathodrahul", {
      expiresIn: "1h",
    });

    // Update the user record with the reset token (you may need to add a column in your users table)
    const updateTokenQuery = "UPDATE users SET reset_token = ? WHERE id = ?";
    await queryDb(updateTokenQuery, [token, user[0].id]);

    // Send the reset link to the user's email
    const resetLink = `http://localhost:3000/reset/${token}`; //localhost:3000/
    http: sendResetEmail(email, resetLink);

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to send reset password email
function sendResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "newlearn5047@gmail.com",
      pass: "fxup olca lwba atwj",
    },
  });

  // Email options
  const mailOptions = {
    from: "support@Vspy.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// function that reset
async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, "rathodrahul"); // Use the same secret key as used during token generation

    const user = await queryDb("SELECT * FROM users WHERE id = ?", [
      decoded.userId,
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's password (you would normally hash the password)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await queryDb(
      "UPDATE users SET password = ?, reset_token = NULL WHERE id = ?",
      [hashedPassword, user[0].id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
// deleteaccount
// // Delete account controller function
// async function deleteaccount(req, res) {
//   try {
//     const userId = req.userId; // Assuming you have middleware to extract userId from the token

//     // Check if the user exists
//     const checkUserQuery = "SELECT * FROM users WHERE id = ?";
//     const user = await queryDb(checkUserQuery, [userId]);

//     if (!user || user.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Delete the user from the database
//     const deleteQuery = "DELETE FROM users WHERE id = ?";
//     await queryDb(deleteQuery, [userId]);

//     // Clear the token cookie
//     res.clearCookie("token");

//     // Redirect to the login page or any other desired page after account deletion
//     res.redirect("/login");
//   } catch (error) {
//     console.error("Delete account error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  // deleteaccount,
};
