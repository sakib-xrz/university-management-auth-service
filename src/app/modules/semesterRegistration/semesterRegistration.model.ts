import mongoose from 'mongoose';
import { SemesterRegistrationInterface } from './semesterRegistration.interface';
import SemesterRegistrationConstants from './semesterRegistration.constant';

const SemesterRegistrationSchema =
  new mongoose.Schema<SemesterRegistrationInterface>(
    {
      academicSemester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
        unique: true,
      },
      status: {
        type: String,
        enum: SemesterRegistrationConstants.Status,
        default: 'UPCOMING',
      },
      startDateTime: {
        type: Date,
        required: true,
      },
      endDateTime: {
        type: Date,
        required: true,
      },
      minCredit: {
        type: Number,
        default: 3,
      },
      maxCredit: {
        type: Number,
        default: 16,
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

export const SemesterRegistration =
  mongoose.model<SemesterRegistrationInterface>(
    'SemesterRegistration',
    SemesterRegistrationSchema,
  );
