import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';
import { StudentInterface } from './student.interface';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import StudentConstants from './student.constant';

const GetStudents = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'faculty',
        },
      }),
    query,
  )
    .search(StudentConstants.StudentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const students = await studentQuery.modelQuery.exec();
  const total = await studentQuery.getCountQuery();
  const { page, limit } = studentQuery.getPaginationInfo();

  return {
    data: students,
    meta: {
      total,
      page,
      limit,
    },
  };
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

const DeleteStudent = async (id: string) => {
  const student = await Student.findOne({ id });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const user = await User.findOneAndUpdate(
      { id: student.id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error: unknown) {
    await session.abortTransaction();
    session.endSession();
    const errorMessage = (error as Error).message || 'Internal server error';
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, errorMessage);
  }
};

const StudentService = {
  GetStudents,
  GetStudentById,
  UpdateStudent,
  DeleteStudent,
};

export default StudentService;
