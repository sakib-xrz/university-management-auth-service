import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistrationInterface } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

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

const GetAllSemesterRegistrations = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const semesterRegistrations =
    await semesterRegistrationQuery.modelQuery.exec();
  const total = await semesterRegistrationQuery.getCountQuery();
  const { page, limit } = semesterRegistrationQuery.getPaginationInfo();

  return {
    data: semesterRegistrations,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const GetSemesterRegistration = async (id: string) => {
  const semesterRegistration =
    await SemesterRegistration.findById(id).populate('academicSemester');

  if (!semesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  return semesterRegistration;
};

const SemesterRegistrationService = {
  CreateSemesterRegistration,
  GetAllSemesterRegistrations,
  GetSemesterRegistration,
};

export default SemesterRegistrationService;
