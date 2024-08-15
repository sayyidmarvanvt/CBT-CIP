import userModal from "../models/userModel.js";
import { sendForgotPassword } from "../Utility/email.js";
import { errorHandler } from "../Utility/errorHandler.js";
import generateToken from "../Utility/generateToken.js";
import bcryptjs from "bcryptjs";
import validator from "validator";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModal.findOne({ email });
    if (exists) {
      return next(errorHandler(400, "Already exists"));
    }
    if (!validator.isEmail(email)) {
      return next(errorHandler(400, "Please enter a valid email"));
    }
    if (password.length < 8) {
      return next(
        errorHandler(400, "Password should be at least 8 characters long")
      );
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await userModal({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    console.log(user);

    const { password: pass, ...rest } = user._doc;
    const token = generateToken(user._id);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ success: true, ...rest });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "User not exists"));
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials "));
    }
    const token = generateToken(user._id);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, ...rest });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      const user = await userModal.findById(req.user.id).select("-password");
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
      res.json({ success: true, user });
    } else {
      return next(errorHandler(401, "You cannot access this id"));
    }
  } catch (error) {
    next(error);
  }
};

//for admin
export const getAllUserProfile = async (req, res, next) => {
  try {
    const user = await userModal.find({}).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only update yours"));

  if (req.body.email && !validator.isEmail(req.body.email)) {
    return next(errorHandler(400, "Please enter a valid email"));
  }
  if (req.body.password) {
    return next(errorHandler(400, "Password cannot be updated via this route"));
  }
  try {
   const user= await userModal
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
          },
        },
        { new: true }
      )
    const { password: pass, ...rest } = user._doc;

    res.status(200).json({ success: true,...rest });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user has been logout");
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you don't have access"));
  }
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(errorHandler(400, "Old and new passwords are required"));
  }

  try {
    const user = await userModal.findById(req.params.id);

    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) return next(errorHandler(400, "Old password is incorrect"));

    if (oldPassword === newPassword) {
      return next(errorHandler(400, "same password"));
    }
    if (newPassword.length < 8) {
      return next(
        errorHandler(400, "Password should be at least 8 characters long")
      );
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const token = generateToken({ id: user._id });

    user.resetPasswordToken = token;
    await user.save();
    await sendForgotPassword(email, token);
    res
      .status(200)
      .json({ success: true, message: "Reset password email sent" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const user = await userModal.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return next(errorHandler(400, "Invalid or expired token"));
    }
    if (password.length < 8) {
      return next(
        errorHandler(400, "Password should be at least 8 characters long")
      );
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password has been reset" });
  } catch (error) {
    next(error);
  }
};
