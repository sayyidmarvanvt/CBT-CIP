import express from "express";
import { forgotPassword, getAllUserProfile, getUserProfile, loginUser, logoutUser, registerUser, updatePassword, updateUserProfile, resetPassword } from "../controllers/userController.js";
import { verifyToken } from "../Utility/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get('/allprofile', getAllUserProfile);
userRouter.get('/profile/:id', verifyToken, getUserProfile);
userRouter.put("/update-profile/:id", verifyToken, updateUserProfile);
userRouter.put("/update-password/:id", verifyToken, updatePassword);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
