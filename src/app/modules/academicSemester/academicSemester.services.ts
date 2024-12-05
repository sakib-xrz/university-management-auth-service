import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterInterface } from './academicSemester.interface';
import AcademicSemesterConstants from './academicSemester.constant';

const CreateAcademicSemester = async (payload: AcademicSemesterInterface) => {
  if (
    payload.name &&
    AcademicSemesterConstants.AcademicSemesterNameCodeMapper[payload.name] !==
      payload.code
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Academic Semester name doesn't match with the code",
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const GetAcademicSemesters = async () => {
  const academicSemesters = await AcademicSemester.find({});
  return academicSemesters;
};

const GetAcademicSemesterById = async (academicSemesterId: string) => {
  const academicSemester = await AcademicSemester.findById(academicSemesterId);
  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }
  return academicSemester;
};

const UpdateAcademicSemester = async (
  academicSemesterId: string,
  payload: Partial<AcademicSemesterInterface>,
) => {
  const academicSemester = await AcademicSemester.findById(academicSemesterId);
  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }

  if (
    payload.name &&
    AcademicSemesterConstants.AcademicSemesterNameCodeMapper[payload.name] !==
      payload.code
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Academic Semester name doesn't match with the code",
    );
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    academicSemesterId,
    payload,
    { new: true, runValidators: true },
  );
  return result;
};

const AcademicSemesterService = {
  CreateAcademicSemester,
  GetAcademicSemesters,
  GetAcademicSemesterById,
  UpdateAcademicSemester,
};

export default AcademicSemesterService;
