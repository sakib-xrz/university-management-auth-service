import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemesterInterface } from '../academicSemester/academicSemester.interface';
import { AcademicFaculty } from './academicFaculty.model';

const CreateAcademicFaculty = async (payload: AcademicSemesterInterface) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const GetAcademicFaculties = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const GetAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  if (!result) {
    throw new Error('No academic faculty found');
  }
  return result;
};

const UpdateAcademicFaculty = async (
  id: string,
  payload: AcademicSemesterInterface,
) => {
  const isAcademicFacultyExistsWithPayloadName = await AcademicFaculty.findOne({
    _id: { $ne: id },
    name: payload.name,
  });

  if (isAcademicFacultyExistsWithPayloadName) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic faculty is already exist!',
    );
  }

  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No academic faculty found');
  }

  return result;
};

const AcademicFacultyService = {
  CreateAcademicFaculty,
  GetAcademicFaculties,
  GetAcademicFaculty,
  UpdateAcademicFaculty,
};

export default AcademicFacultyService;
