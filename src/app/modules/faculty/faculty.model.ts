import mongoose from 'mongoose';
import { FacultyInterface } from './faculty.interface';

const FacultySchema = new mongoose.Schema<FacultyInterface>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

// virtual
FacultySchema.virtual('fullName').get(function () {
  const { firstName, middleName, lastName } = this.name;
  return `${firstName} ${middleName ? middleName : ''} ${lastName}`;
});

// Query Middleware
FacultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

FacultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

FacultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Faculty = mongoose.model<FacultyInterface>(
  'Faculty',
  FacultySchema,
);
