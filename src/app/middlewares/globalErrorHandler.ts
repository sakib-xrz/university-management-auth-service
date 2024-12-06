/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import handelZodError from '../errors/handelZodError';
import { ErrorSourcesType } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = 'Something went wrong!';
  let errorSources: ErrorSourcesType = [
    {
      message: 'Something went wrong!',
      path: '',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export default globalErrorHandler;
