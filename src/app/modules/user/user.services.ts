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
import { FacultyInterface } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { AdminInterface } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const {
  default_student_password,
  default_faculty_password,
  default_admin_password,
} = config;

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
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const CreateFaculty = async (password: string, payload: FacultyInterface) => {
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid academic department');
  }

  const facultyId = await UserUtils.generateFacultyId();

  const userData: Partial<UserInterface> = {};

  userData.password = password || default_faculty_password;
  userData.role = 'FACULTY';
  userData.id = facultyId;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.create([userData], { session });

    if (!user.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const faculty = await Faculty.create(
      [
        {
          ...payload,
          id: facultyId,
          user: user[0]._id,
        },
      ],
      { session },
    );

    if (!faculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    session.endSession();

    return faculty[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const CreateAdmin = async (password: string, payload: AdminInterface) => {
  const adminId = await UserUtils.generateAdminId();

  const userData: Partial<UserInterface> = {};

  userData.password = password || default_admin_password;
  userData.role = 'ADMIN';
  userData.id = adminId;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.create([userData], { session });

    if (!user.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const admin = await Admin.create(
      [
        {
          ...payload,
          id: adminId,
          user: user[0]._id,
        },
      ],
      { session },
    );

    if (!admin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return admin[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const UserService = { CreateStudent, CreateFaculty, CreateAdmin };

export default UserService;
