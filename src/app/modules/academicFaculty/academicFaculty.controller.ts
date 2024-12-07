import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AcademicFacultyService from './academicFaculty.services';

const CreateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.CreateAcademicFaculty(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Academic faculty created successfully',
    data: result,
  });
});

const GetAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.GetAcademicFaculties();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculties retrieved successfully',
    data: result,
  });
});

const GetAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.GetAcademicFaculty(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty retrieved successfully',
    data: result,
  });
});

const UpdateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.UpdateAcademicFaculty(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

const AcademicFacultyController = {
  CreateAcademicFaculty,
  GetAcademicFaculties,
  GetAcademicFaculty,
  UpdateAcademicFaculty,
};

export default AcademicFacultyController;
