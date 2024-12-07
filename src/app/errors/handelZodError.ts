import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { ErrorSourcesType, GenericErrorResponseType } from '../interface/error';

const handelZodError = (err: ZodError): GenericErrorResponseType => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Validation Error!';
  const errorSources: ErrorSourcesType = err.issues.map((issue: ZodIssue) => {
    return {
      message: issue.message,
      path: issue?.path[issue.path.length - 1] as string,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handelZodError;
