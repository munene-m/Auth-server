const validateRegistration = (username, email, password) => {
  if (username === "") {
    return { message: "Username is required" };
  } else if (email === "") {
    return { message: "Email is required" };
  } else if (!isValidEmail(email)) {
    return { message: "Invalid email format" };
  } else if (password === "") {
    return { message: "Password is required" };
  }

  return null; // Return null if validation passes
};
const validateLogin = (email, password) => {
  if (email === "") {
    return { message: "Email is required" };
  } else if (!isValidEmail(email)) {
    return { message: "Invalid email format" };
  } else if (password === "") {
    return { message: "Password is required" };
  }

  return null; // Return null if validation passes
};

const isValidEmail = (email) => {
  // Simple email validation using regex
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

module.exports = {
  validateRegistration,
  validateLogin,
};
