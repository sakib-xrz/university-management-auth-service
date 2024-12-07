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

const GetAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.GetAcademicDepartments();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic departments fetched successfully',
    data: result,
  });
});

const GetAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.GetAcademicDepartment(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic department fetched successfully',
    data: result,
  });
});

const UpdateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.UpdateAcademicDepartment(
    id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic department updated successfully',
    data: result,
  });
});

const AcademicDepartmentController = {
  CreateAcademicDepartment,
  GetAcademicDepartments,
  GetAcademicDepartment,
  UpdateAcademicDepartment,
};

export default AcademicDepartmentController;
