import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AcademicSemesterService from './academicSemester.services';

const CreateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const academicSemesterData = req.body;

    const result =
      await AcademicSemesterService.CreateAcademicSemester(
        academicSemesterData,
      );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
  },
);

const AcademicSemesterController = { CreateAcademicSemester };

export default AcademicSemesterController;
