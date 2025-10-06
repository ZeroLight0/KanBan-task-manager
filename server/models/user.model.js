import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
