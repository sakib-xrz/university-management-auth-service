import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserService from './user.services';

const CreateStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await UserService.CreateStudent(password, student);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const CreateFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const result = await UserService.CreateFaculty(password, faculty);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const CreateAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await UserService.CreateAdmin(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const UserController = { CreateStudent, CreateFaculty, CreateAdmin };

export default UserController;
