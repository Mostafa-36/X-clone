export default (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      mesaage: error.mesaage,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};
