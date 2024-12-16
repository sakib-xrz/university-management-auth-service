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

const SemesterRegistrationController = { CreateSemesterRegistration };

export default SemesterRegistrationController;
