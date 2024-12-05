import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';

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

const StudentService = { GetStudents, GetStudentById };

export default StudentService;
