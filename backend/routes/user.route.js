import express from "express";
import {
  getSuggestedUsers,
  getUserProfile,
  toggleFollowUser,
  updateUser,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/:username", protect, getUserProfile);
router.post("/follow/:id", protect, toggleFollowUser);
router.post("/update", protect, updateUser);
router.get("/suggested", protect, getSuggestedUsers);

export default router;
