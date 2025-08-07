import AppError from "../errors/AppError.js";
import cloudinary from "../lib/cloudinary.js";
import catchAsync from "../utils/catchAsync.js";
import filterOut from "../utils/filterOut.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const toggleFollowUser = catchAsync(async (req, res, next) => {
  const userToFollowId = req.params.id;
  const userId = req.user._id.toString();
  let isFollowing = false;

  if (userId === userToFollowId)
    return next(new AppError("You cannot follow yourself", 403));

  const [currentUser, userToFollow] = await Promise.all([
    User.findById(userId),
    User.findById(userToFollowId),
  ]);

  if (!userToFollow) return next(new AppError("User not found", 404));

  const isTargetUserFollowing = currentUser.following.some(
    (id) => id.toString() === userToFollowId
  );

  if (isTargetUserFollowing) {
    currentUser.following = filterOut(currentUser.following, userToFollowId);
    userToFollow.followers = filterOut(userToFollow.followers, userId);
  } else {
    currentUser.following.push(userToFollowId);
    userToFollow.followers.push(userId);
    isFollowing = true;
  }

  await Promise.all([currentUser.save(), userToFollow.save()]);

  if (isFollowing) {
    await Notification.create({
      from: userId,
      to: userToFollowId,
      type: "follow",
    });
  }

  res.status(200).json({
    status: "success",
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { fullName, email, username, currentPassword, newPassword, bio, link } =
    req.body;

  let { profileImg, coverImg } = req.body;

  let currentUser = await User.findById(req.user._id);

  if (profileImg) {
    if (currentUser.profileImg) {
      const profileImgId = currentUser.profileImg
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.v2.uploader.destroy(profileImgId);
    }

    profileImg = await cloudinary.v2.uploader.upload(profileImg, {
      folder: "users",
    });

    currentUser.profileImg = profileImg.secure_url;
  }

  if (coverImg) {
    if (currentUser.coverImg) {
      let coverImgId = currentUser.coverImg.split("/").pop().split(".")[0];
      await cloudinary.v2.uploader.destroy(coverImgId);
    }

    coverImg = await cloudinary.v2.uploader.upload(coverImg, {
      folder: "users",
    });

    currentUser.coverImg = coverImg.secure_url;
  }

  if (
    newPassword &&
    currentPassword &&
    (await currentUser.correctPassword(currentPassword))
  ) {
    currentUser.password = newPassword;
  }

  currentUser.fullName = fullName || currentUser.fullName;
  currentUser.email = email || currentUser.email;
  currentUser.username = username || currentUser.username;
  currentUser.bio = bio || currentUser.bio;
  currentUser.link = link || currentUser.link;

  const user = await currentUser.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getSuggestedUsers = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);

  const usersFollowedByMe = currentUser.following.map((el) => el.toString());

  const users = await User.aggregate([
    {
      $match: {
        _id: { $ne: currentUser._id },
      },
    },
    { $sample: { size: 10 } },
  ]);

  const suggestedUsers = users
    .filter((el) => !usersFollowedByMe.includes(el._id.toString()))
    .slice(0, 4);

  res.status(200).json({
    status: "success",
    data: {
      suggestedUsers,
    },
  });
});
