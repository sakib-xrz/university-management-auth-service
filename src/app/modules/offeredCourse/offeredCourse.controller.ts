import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import OfferedCourseService from './offeredCourse.services';

const CreateOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.CreateOfferedCourse(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Offered Course created successfully',
    data: result,
  });
});

const OfferedCourseController = {
  CreateOfferedCourse,
};

export default OfferedCourseController;
