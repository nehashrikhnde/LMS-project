import Apperror from "../utils/Apperror.utils.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.middleware.js";

export const isloggedIn = asyncHandler(async (req, _res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Apperror("unauthorized,please login again", 401));
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new Apperror("unauthorized ,please login to continue", 401));
  }
  req.user = decoded;
  next();
});
export const authorizedroles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Apperror("you do not have permissiom to access to this route", 403)
      );
    }
    next();
  });

export const authorizesubscribers = asyncHandler(async (req, _res, next) => {
  const user= await user.findBy(req.user.id)
  console.log(user);
  if (user.role !== "ADMIN" && user.subscription.status !== "active") {
    return next(new Apperror("please subscribe to access this route!", 403));
  }
  next();
});
