import mongoose from 'mongoose';
import { OfferedCourseInterface } from './offeredCourse.interface';
import OfferedCourseConstants from './offeredCourse.constant';

const OfferedCourseSchema = new mongoose.Schema<OfferedCourseInterface>(
  {
    semesterRegistration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    days: {
      type: [String],
      enum: OfferedCourseConstants.Days,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
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

export const OfferedCourse = mongoose.model<OfferedCourseInterface>(
  'OfferedCourse',
  OfferedCourseSchema,
);
