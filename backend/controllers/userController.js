import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { validateAuthRequest } from "../validateRequests/validateUsersRequest.js";
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    // set JWT as http only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    });
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
  res.send("register user");
});

//@desc logout user / clear cookies
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
});

//@desc get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@desc update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//@desc get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});
//@desc get user by id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});
//@desc delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler((req, res) => {
  res.send("delete user");
});

//@desc update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler((req, res) => {
  res.send("update user");
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
