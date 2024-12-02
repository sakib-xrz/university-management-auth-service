import mongoose from 'mongoose';
import { AcademicSemesterInterface } from './academicSemester.interface';
import { AcademicSemesterConstants } from './academicSemester.constant';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const AcademicSemesterSchema = new mongoose.Schema<AcademicSemesterInterface>(
  {
    name: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.Months,
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

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExistOnSameYear = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExistOnSameYear) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Semester already exist on this year',
    );
  }

  next();
});

export const AcademicSemester = mongoose.model<AcademicSemesterInterface>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
