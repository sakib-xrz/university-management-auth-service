import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import StudentService from './student.services';

const GetStudents = catchAsync(async (req, res) => {
  const result = await StudentService.GetStudents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    data: result,
  });
});

const GetStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.GetStudentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const UpdateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedStudentData = req.body;
  const result = await StudentService.UpdateStudent(id, updatedStudentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const StudentController = { GetStudents, GetStudentById, UpdateStudent };

export default StudentController;
