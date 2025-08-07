import catchAsync from "../utils/catchAsync.js";
import Notification from "../models/notification.model.js";

export const getNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const notifications = await Notification.find({
    to: userId,
  }).populate({
    path: "from",
    select: "username profileImg",
  });

  await Notification.updateMany({ to: userId }, { isRead: true });

  res.status(200).json({
    status: "success",
    data: {
      notifications,
    },
  });
});

export const deleteNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  await Notification.deleteMany({ to: userId });

  res.status(204).json({
    status: "success",
    message: "Notification deleted successfully!",
  });
});
