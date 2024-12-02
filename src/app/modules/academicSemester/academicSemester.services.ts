import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterInterface } from './academicSemester.interface';
import AcademicSemesterConstants from './academicSemester.constant';

const CreateAcademicSemester = async (
  academicSemesterData: AcademicSemesterInterface,
) => {
  if (
    AcademicSemesterConstants.AcademicSemesterNameCodeMapper[
      academicSemesterData.name
    ]
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Academic Semester name doesn't match with the code",
    );
  }
  const result = await AcademicSemester.create(academicSemesterData);
  return result;
};

const AcademicSemesterService = { CreateAcademicSemester };

export default AcademicSemesterService;
