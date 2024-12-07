import mongoose from 'mongoose';
import { AcademicFacultyInterface } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const AcademicFacultySchema = new mongoose.Schema<AcademicFacultyInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  },
);

AcademicFacultySchema.pre('save', async function (next) {
  const isAcademicFacultyExists = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic faculty is already exist!',
    );
  }

  next();
});

export const AcademicFaculty = mongoose.model<AcademicFacultyInterface>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
