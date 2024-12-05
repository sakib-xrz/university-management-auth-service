import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { StudentInterface } from '../student/student.interface';
import { UserInterface } from './user.interface';
import UserUtils from './user.utils';
import mongoose from 'mongoose';
import { User } from './user.model';
import { Student } from '../student/student.model';

const { default_student_password } = config;

const CreateStudent = async (password: string, payload: StudentInterface) => {
  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!academicSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid academic semester');
  }

  const studentId = await UserUtils.generateStudentId(academicSemester);

  const userData: Partial<UserInterface> = {};

  userData.password = password || default_student_password;
  userData.role = 'STUDENT';
  userData.id = studentId;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.create([userData], { session });

    if (!user.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const student = await Student.create(
      [
        {
          ...payload,
          id: studentId,
          user: user[0]._id,
        },
      ],
      { session },
    );

    if (!student.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    session.endSession();

    return student[0];
  } catch (error: unknown) {
    await session.abortTransaction();
    session.endSession();
    const errorMessage = (error as Error).message || 'Internal server error';
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, errorMessage);
  }
};

const UserService = { CreateStudent };

export default UserService;
