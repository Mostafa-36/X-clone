import AppError from "../errors/AppError.js";
import cloudinary from "../lib/cloudinary.js";
import catchAsync from "../utils/catchAsync.js";
import filterOut from "../utils/filterOut.js";
import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = catchAsync(async (req, res, next) => {
  const { text, img } = req.body;

  const userId = req.user._id;

  if (!img && !text)
    return next(new AppError("Please provide img, text fields", 400));

  let img_url;
  if (img) {
    img_url = await cloudinary.v2.uploader.upload(img);
  }

  const newPost = await Post.create({
    text,
    img: img_url?.secure_url,
    user: userId,
  });

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(id);

  if (!post) return next(new AppError("No post found", 404));

  if (userId.toString() !== post.user._id.toString())
    return next("You are not authorized to delete this post", 401);

  if (post.img) {
    let image = post.img.split("/").pop().split(".")[0];

    await cloudinary.v2.uploader.destroy(image);
  }

  await Post.findByIdAndDelete(post._id);

  res.status(204).json({
    status: "success",
    message: "Post has been deleted successfully",
  });
});

export const commentOnPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;

  const userId = req.user._id;

  const post = await Post.findById(id);

  if (!post) return next(new AppError("No post found", 404));

  post.comments.push({ text, user: userId });

  await post.save();

  const newComment = post.comments.at(-1);

  res.status(201).json({
    status: "success",
    data: { comment: newComment },
  });
});

export const toggleLike = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const [user, post] = await Promise.all([
    User.findById(req.user._id),
    Post.findById(id),
  ]);

  if (!post) return next(new AppError("No post found", 404));

  const isLiked = user.likedPosts.some(
    (postId) => postId.toString() === post._id.toString()
  );

  if (isLiked) {
    user.likedPosts = filterOut(user.likedPosts, post._id);
    post.likes = filterOut(post.likes, user._id);
  } else {
    user.likedPosts.push(post._id);
    post.likes.push(user._id);
  }

  await Promise.all([user.save(), post.save()]);

  if (!isLiked) {
    await Notification.create({
      from: user._id,
      to: post.user._id,
      type: "like",
    });
  }

  res.status(200).json({ status: "success" });
});

export const getAllPosts = catchAsync(async (req, res, next) => {
  const allPosts = await Post.find().populate("user").populate("comments.user");

  res.status(200).json({
    status: "success",
    data: {
      posts: allPosts,
    },
  });
});

export const getFollowingPosts = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);

  const followingByMe = currentUser.following;

  let posts = await Post.find({ user: { $in: followingByMe } })
    .populate("user")
    .sort({
      createdAt: -1,
    })
    .populate("user")
    .populate("comments.user");

  res.status(200).json({
    status: "success",
    data: {
      posts: posts,
    },
  });
});

export const getLikedPosts = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const targetUser = await User.findById(id);

  if (!targetUser) return next(new AppError("No user with this id", 404));

  const postsLikedByTargetUser = await Post.find({
    likes: { $in: targetUser._id },
  })
    .sort({ createdAt: -1 })
    .populate("user")
    .populate("comments.user");

  res.status(200).json({
    status: "success",
    data: {
      posts: postsLikedByTargetUser,
    },
  });
});

export const getUserPosts = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const targetUser = await User.findOne({ username });

  if (!targetUser) return next(new AppError("No user with this username", 404));

  const posts = await Post.find({ user: targetUser._id })
    .sort({ createdAt: -1 })
    .populate("user")
    .populate("comments.user");

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});
