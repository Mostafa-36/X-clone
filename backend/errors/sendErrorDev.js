export default (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    ...error,
    message: error.message,
    stack: error.stack,
  });
};
