import { StatusCodes } from 'http-status-codes';
const errorHandlerMiddleware = (err, req, res, next) => {
  //   console.log(err.message);
  const defaultError = {
    statusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong please try again!',
  };
  if (err.name === 'ValidationError') {
    defaultError.statusCodes = StatusCodes.BAD_REQUEST;

    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCodes = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.values(err.keyValue)} has to be unique`;
  }

  res.status(defaultError.statusCodes).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
