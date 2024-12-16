import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistrationInterface } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const CreateSemesterRegistration = async (
  payload: SemesterRegistrationInterface,
) => {
  const isSemesterExist = await AcademicSemester.findById(
    payload.academicSemester,
  );

  if (!isSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester not found');
  }

  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester: payload.academicSemester,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester registration already exist',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const SemesterRegistrationService = { CreateSemesterRegistration };

export default SemesterRegistrationService;
