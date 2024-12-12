import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookies or Autherization header
    const token =
      req.cookies?.accessToken ||
      req.header("Autherization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "Unautherized Request, user does not exist");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -accessToken"
    );

    if (!user) {
      // TODO: Check about frontend
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});
