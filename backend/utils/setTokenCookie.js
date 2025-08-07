export default (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 90 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
  });
};
