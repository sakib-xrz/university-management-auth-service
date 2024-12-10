import mongoose from 'mongoose';
import {
  CourseFacultyType,
  CourseInterface,
  PrerequisiteCourseType,
} from './course.interface';

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

const CourseFacultySchema = new mongoose.Schema<CourseFacultyType>(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      unique: true,
      required: true,
    },
    faculties: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Faculty',
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

export const CourseFaculty = mongoose.model<CourseFacultyType>(
  'CourseFaculty',
  CourseFacultySchema,
);

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

// Query Middleware
CourseSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CourseSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CourseSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Course = mongoose.model<CourseInterface>('Course', CourseSchema);
