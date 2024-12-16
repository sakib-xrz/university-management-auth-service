import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import SemesterRegistrationService from './semesterRegistration.services';

const CreateSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.CreateSemesterRegistration(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Semester Registration Created Successfully',
    data: result,
  });
});

const GetAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.GetAllSemesterRegistrations(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registrations Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const SemesterRegistrationController = {
  CreateSemesterRegistration,
  GetAllSemesterRegistrations,
};

export default SemesterRegistrationController;
