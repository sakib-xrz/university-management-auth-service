import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import FacultyConstants from './faculty.constant';
import { Faculty } from './faculty.model';
import { FacultyInterface } from './faculty.interface';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const GetFaculties = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'faculty',
      },
    }),
    query,
  )
    .search(FacultyConstants.FacultySearchableFields)
    .sort()
    .paginate()
    .fields();

  const faculties = await facultyQuery.modelQuery.exec();
  const total = await facultyQuery.getCountQuery();
  const { page, limit } = facultyQuery.getPaginationInfo();

  return {
    data: faculties,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const GetFacultyById = async (id: string) => {
  const faculty = await Faculty.findOne({
    id,
  });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  return faculty;
};

const UpdateFaculty = async (
  id: string,
  payload: Partial<FacultyInterface>,
) => {
  const faculty = await Faculty.findOne({ id });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const { name, ...reamingFields } = payload;

  const modifiedPayload: Record<string, unknown> = {
    ...reamingFields,
  };

  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value;
    }
  }

  const updatedFaculty = await Faculty.findOneAndUpdate(
    { id },
    modifiedPayload,
    { new: true, runValidators: true },
  );

  return updatedFaculty;
};

const DeleteFaculty = async (id: string) => {
  const faculty = await Faculty.findOne({ id });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    const user = await User.findOneAndUpdate(
      { id: faculty.id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const FacultyService = {
  GetFaculties,
  GetFacultyById,
  UpdateFaculty,
  DeleteFaculty,
};

export default FacultyService;
