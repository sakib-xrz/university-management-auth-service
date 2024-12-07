import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AcademicDepartmentService from './academicDepartment.services';

const CreateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.CreateAcademicDepartment(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Academic department created successfully',
    data: result,
  });
});

const AcademicDepartmentController = { CreateAcademicDepartment };

export default AcademicDepartmentController;
