const validateAuthRequest = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400); // bad request
    throw new Error("Email or password field cannot be empty");
  }
  if (typeof email != "string" || typeof password != "string") {
    res.status(400); // bad request
    throw new Error("Invalid type of email or password");
  }
};

export { validateAuthRequest };
