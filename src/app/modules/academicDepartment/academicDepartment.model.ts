import mongoose from 'mongoose';
import { AcademicDepartmentInterface } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const AcademicDepartmentSchema =
  new mongoose.Schema<AcademicDepartmentInterface>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      academicFaculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
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

AcademicDepartmentSchema.pre('save', async function (next) {
  const isAcademicDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic department is already exist!',
    );
  }

  next();
});

export const AcademicDepartment = mongoose.model<AcademicDepartmentInterface>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
