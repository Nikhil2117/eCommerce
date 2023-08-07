import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//protect routes
const protect = asyncHandler(async (req, res, next) => {
//   console.log("Inside protect route");
  let token;

  //read token from cookie
  token = await req.cookies.jwt
//   console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized user access, incorrect token");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized user access, No token");
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Not an admin, Insufficient Permissions");
  }
});

export { protect, admin };
