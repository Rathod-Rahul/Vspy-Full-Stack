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
