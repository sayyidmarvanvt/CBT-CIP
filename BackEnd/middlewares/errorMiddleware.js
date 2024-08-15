// import { errorHandler } from "../Utility/errorHandler.js";

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(`Error: ${message}`);
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
