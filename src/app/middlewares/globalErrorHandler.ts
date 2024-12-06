/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';

type ErrorSourcesType = {
  message: string;
  path: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const message = 'Something went wrong!';
  const errorSources: ErrorSourcesType = [
    {
      message: 'Something went wrong!',
      path: '',
    },
  ];

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    finalError: err,
  });
};

export default globalErrorHandler;
