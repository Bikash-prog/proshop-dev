import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//methods
userSchema.methods.matchPassword = async function (enteredPassword) {
  // compare entered password with hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

const user = mongoose.model("User", userSchema);

export default user;
