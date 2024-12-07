/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import e, { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import handelZodError from '../errors/handelZodError';
import { ErrorSourcesType } from '../interface/error';
import handelValidationError from '../errors/handleValidationError';
import handelCastError from '../errors/handelCastError';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  let statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = err.message || 'Something went wrong!';
  let errorSources: ErrorSourcesType = [
    {
      message: err.message || 'Something went wrong!',
      path: err?.path || '',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handelValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handelCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    originalError: err, // for testing purpose
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export default globalErrorHandler;
