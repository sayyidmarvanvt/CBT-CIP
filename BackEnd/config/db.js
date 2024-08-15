import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("DB connected"));
  } catch (error) {
    console.log(error, "error in db");
  }
};
