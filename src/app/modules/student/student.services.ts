import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';
import { StudentInterface } from './student.interface';

const GetStudents = async () => {
  const students = await Student.find();
  return students;
};

const GetStudentById = async (id: string) => {
  const student = await Student.findOne({
    id,
  });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return student;
};

const UpdateStudent = async (
  id: string,
  payload: Partial<StudentInterface>,
) => {
  const student = await Student.findOne({ id });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  // separate non primitive fields from the payload
  const { name, guardian, localGuardian, ...reamingFields } = payload;

  const modifiedPayload: Record<string, unknown> = {
    ...reamingFields,
  };

  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length > 0) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedPayload[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedPayload[`localGuardian.${key}`] = value;
    }
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { id },
    modifiedPayload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedStudent;
};

const StudentService = { GetStudents, GetStudentById, UpdateStudent };

export default StudentService;
