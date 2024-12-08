import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FacultyService from './faculty.services';

const GetFaculties = catchAsync(async (req, res) => {
  const result = await FacultyService.GetFaculties(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const GetFacultyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyService.GetFacultyById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

const UpdateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedFacultyData = req.body;
  const result = await FacultyService.UpdateFaculty(id, updatedFacultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const DeleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  await FacultyService.DeleteFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Faculty deleted successfully',
  });
});

const FacultyController = {
  GetFaculties,
  GetFacultyById,
  UpdateFaculty,
  DeleteFaculty,
};

export default FacultyController;
