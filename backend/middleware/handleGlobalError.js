import errorHandlersList from "../errors/errorHandleList.js";
import sendErrorDev from "../errors/sendErrorDev.js";
import sendErrorProd from "../errors/sendErrorProd.js";

export default (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV !== "development") {
    let error = JSON.parse(JSON.stringify(err));

    for (let { match, helper } of errorHandlersList) {
      if (match(error)) {
        error = helper(error);
      }
    }

    sendErrorProd(res, error);
  } else {
    sendErrorDev(res, err);
  }
};
