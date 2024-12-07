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

const AcademicFacultyController = { CreateAcademicFaculty };

export default AcademicFacultyController;
