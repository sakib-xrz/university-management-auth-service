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

const UserController = { CreateStudent };

export default UserController;
