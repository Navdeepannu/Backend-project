import { Router } from "express";
import {
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

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

// secured logout Routes
router.route("/logout").post(verifyJWT, logoutUser);

// refreshAccessToken
router.route("/refresh-token").post(refreshAccessToken);
export default router;
