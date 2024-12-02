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

const GetAcademicSemesters = catchAsync(async (req: Request, res: Response) => {
  const academicSemesters =
    await AcademicSemesterService.GetAcademicSemesters();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters Fetched Successfully',
    data: academicSemesters,
  });
});

const GetAcademicSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const academicSemesterId = req.params.id;

    const academicSemester =
      await AcademicSemesterService.GetAcademicSemesterById(academicSemesterId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Fetched Successfully',
      data: academicSemester,
    });
  },
);

const UpdateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const academicSemesterId = req.params.id;
    const academicSemesterData = req.body;

    const academicSemester =
      await AcademicSemesterService.UpdateAcademicSemester(
        academicSemesterId,
        academicSemesterData,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Updated Successfully',
      data: academicSemester,
    });
  },
);

const AcademicSemesterController = {
  CreateAcademicSemester,
  GetAcademicSemesters,
  GetAcademicSemesterById,
  UpdateAcademicSemester,
};

export default AcademicSemesterController;
