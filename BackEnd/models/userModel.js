import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please Enter your Name"] },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    resetPasswordToken: { type: String },
  },
  { timestamps: true }
);

const userModal = mongoose.model("User", userSchema);

export default userModal;
