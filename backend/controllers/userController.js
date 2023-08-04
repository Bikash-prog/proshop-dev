import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import { generateToken } from "../utils/generateToken.js";
import {
  validateAuthRequest,
  validateRegisterRequest,
  validateGetUserByIdRequest,
} from "../utils/validateUsersRequest.js";
//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //validate request
  validateAuthRequest(req, res);
  // find user by email
  const user = await User.findOne({ email: email });
  // check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    // generate token
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); // unauthorized
    throw new Error("Invalid email or password");
  }
});

//@desc register a new user
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //validate request
  validateRegisterRequest(req, res);
  // check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // create user
  const user = await User.create({
    name,
    email,
    password,
  });
  // if user created successfully
  if (user) {
    // generate token
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc logout user / clear cookies
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
});

//@desc get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { name, email, password } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Error in fetching users");
  }
});
//@desc get user by id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //validate request
  validateGetUserByIdRequest(req, res);
  const user = await User.findById(id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && user.isAdmin) {
    res.status(400);
    throw new Error("Cannot delete admin user");
  } else if (user && !user.isAdmin) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
