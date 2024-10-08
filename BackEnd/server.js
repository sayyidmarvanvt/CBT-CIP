import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import guestRouter from "./routes/guestRoutes.js";
import {
  errorHandlerMiddleware,
  notFound,
} from "./middlewares/errorMiddleware.js";
import budgetRouter from "./routes/budgetRoutes.js";
import expenseRouter from "./routes/expenseRouter.js";
import scheduleRouter from "./routes/scheduleRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'https://eventplanner-frontend-sdjb.onrender.com', 
  credentials: true, 
};

app.use(cors(corsOptions));

connectDB();

//Routes
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/guests", guestRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/vendors", vendorRouter);

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

//miidlewares
app.use(notFound);
app.use(errorHandlerMiddleware);



app.listen(process.env.PORT, () => {
  console.log(`Server Started on http://localhost:${process.env.PORT}`);
});
