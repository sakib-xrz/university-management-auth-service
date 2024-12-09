import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Admin } from './admin.model';
import AdminConstants from './admin.constant';
import { AdminInterface } from './admin.interface';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const GetAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminConstants.AdminSearchableFields)
    .sort()
    .paginate()
    .fields();

  const admins = await adminQuery.modelQuery.exec();
  const total = await adminQuery.getCountQuery();
  const { page, limit } = adminQuery.getPaginationInfo();

  return {
    data: admins,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const GetAdminById = async (id: string) => {
  const admin = await Admin.findOne({
    id,
  });

  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  return admin;
};

const UpdateAdmin = async (id: string, payload: Partial<AdminInterface>) => {
  const faculty = await Admin.findOne({ id });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
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

  const updatedAdmin = await Admin.findOneAndUpdate({ id }, modifiedPayload, {
    new: true,
    runValidators: true,
  });

  return updatedAdmin;
};

const DeleteAdmin = async (id: string) => {
  const admin = await Admin.findOne({ id });

  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    const user = await User.findOneAndUpdate(
      { id: admin.id },
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

const AdminService = { GetAdmins, GetAdminById, UpdateAdmin, DeleteAdmin };

export default AdminService;
