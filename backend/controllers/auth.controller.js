import AppError from "../errors/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import generateToken from "../utils/generateToken.js";
import setTokenCookie from "../utils/setTokenCookie.js";
import User from "../models/user.model.js";

export const signup = catchAsync(async (req, res, next) => {
  const { fullName, username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) return next(new AppError("User already exists", 400));

  const newUser = await User.create({ fullName, username, email, password });

  const token = generateToken(newUser._id);

  setTokenCookie(res, token);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      },
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new AppError("Invalid credentials", 400));

  const existingUser = await User.findOne({ username }).select("+password");

  if (!existingUser)
    return next(
      new AppError("No user found with this username, please sign up", 401)
    );

  if (!(await existingUser.correctPassword(password)))
    return next(new AppError("Invalid credentials", 401));

  const token = generateToken(existingUser._id);

  setTokenCookie(res, token);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        fullName: existingUser.fullName,
      },
    },
  });
});

export const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({
    status: "success",
    message: "Logged Out successfully",
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  const myuser = await User.findOne({ _id: req.user._id });

  res.status(200).json({
    status: "success",
    data: { user: myuser },
  });
});
