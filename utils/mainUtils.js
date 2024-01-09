exports.formatDateString = (inputDateString) => {
  // Parse the input string to create a Date object
  const inputDate = new Date(inputDateString);

  // Get the individual components of the date
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString("en-US", { month: "short" });
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const seconds = inputDate.getSeconds();

  // Format the date components into the desired string
  const formattedDateString = `day:${day} hours :${hours} minutes:${minutes} seconds:${seconds}`;
  // formating nedeed

  return formattedDateString;
};

exports.formatTimeString = (inputTimeString) => {
  // Parse the input string to create a Date object
  const inputDate = new Date(inputTimeString);

  // Get the individual components of the date
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const seconds = inputDate.getSeconds();

  // Format the date components into the desired string
  const formattedTimeString = `hours :${hours} minutes:${minutes} seconds:${seconds}`;
  // formating nedeed

  return formattedTimeString;
};
