import mongoose from 'mongoose';
import { CourseInterface, PrerequisiteCourseType } from './course.interface';

const PrerequisiteCourseSchema = new mongoose.Schema<PrerequisiteCourseType>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const CourseSchema = new mongoose.Schema<CourseInterface>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    prerequisiteCourses: {
      type: [PrerequisiteCourseSchema],
      default: [],
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

export const Course = mongoose.model<CourseInterface>('Course', CourseSchema);
