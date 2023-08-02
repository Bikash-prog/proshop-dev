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

const validateRegisterRequest = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400); // bad request
    throw new Error("Name, email or password field cannot be empty");
  }
  if (
    typeof name != "string" ||
    typeof email != "string" ||
    typeof password != "string"
  ) {
    res.status(400); // bad request
    throw new Error("Invalid type of name, email or password");
  }
  if (password.length < 5) {
    res.status(400); // bad request
    throw new Error("Password must be at least 5 characters long");
  }
  if (password.length > 20) {
    res.status(400); // bad request
    throw new Error("Password must be at most 20 characters long");
  }
  if (email.includes("@") === false) {
    res.status(400); // bad request
    throw new Error("Invalid email address");
  }
};

const validateGetUserByIdRequest = (req, res) => {
  if (req.params.id.length != 24) {
    res.status(400); // bad request
    throw new Error("user id is not valid");
  }
};

export {
  validateAuthRequest,
  validateRegisterRequest,
  validateGetUserByIdRequest,
};
