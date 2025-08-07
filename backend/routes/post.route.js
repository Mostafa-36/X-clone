import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  toggleLike,
} from "../controllers/post.controller.js";

const router = express.Router();
router.post("/create", protect, createPost);
router.delete("/:id", protect, deletePost);
router.post("/:id/comment", protect, commentOnPost);
router.post("/:id/like", protect, toggleLike);
router.get("/", protect, getAllPosts);
router.get("/following", protect, getFollowingPosts);
router.get("/likes/:id", protect, getLikedPosts);
router.get("/user/:username", protect, getUserPosts);
export default router;
