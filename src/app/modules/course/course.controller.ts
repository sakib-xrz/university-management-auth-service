import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CourseService from './course.services';

const CreateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.CreateCourse(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const GetCourses = catchAsync(async (req, res) => {
  const result = await CourseService.GetCourses(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const GetCourseById = catchAsync(async (req, res) => {
  const result = await CourseService.GetCourseById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course fetched successfully',
    data: result,
  });
});

const UpdateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.UpdateCourse(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

const DeleteCourse = catchAsync(async (req, res) => {
  await CourseService.DeleteCourse(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Course deleted successfully',
  });
});

const AssignFacultyToCourse = catchAsync(async (req, res) => {
  const result = await CourseService.AssignFacultyToCourse(
    req.params.id,
    req.body.faculties,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty assigned to course successfully',
    data: result,
  });
});

const RemoveFacultyFromCourse = catchAsync(async (req, res) => {
  await CourseService.RemoveFacultyFromCourse(
    req.params.id,
    req.body.faculties,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Faculty removed from course successfully',
  });
});

const CourseController = {
  CreateCourse,
  GetCourses,
  GetCourseById,
  UpdateCourse,
  DeleteCourse,
  AssignFacultyToCourse,
  RemoveFacultyFromCourse,
};

export default CourseController;
