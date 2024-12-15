import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verify } from "jsonwebtoken";

const router = Router();

// User register Route
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// Login Route
router.route("/login").post(loginUser);

// Secured logout Routes
router.route("/logout").post(verifyJWT, logoutUser);

// refreshAccessToken
router.route("/refresh-token").post(refreshAccessToken);

// Change password Route
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

// Current User Route
router.route("/current-user").get(verifyJWT, getCurrentUser);

// Update Account Details Route
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

// Update Avatar Route
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// Update Cover Image Route
router
  .route("/coverImage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

// Get User Channel Profile Route
router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

// watchHistory
router.route("/history").get(verifyJWT, getWatchHistory);
export default router;
