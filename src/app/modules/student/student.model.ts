import mongoose from 'mongoose';
import {
  GuardianType,
  LocalGuardianType,
  StudentInterface,
} from './student.interface';

const GuardianSchema = new mongoose.Schema<GuardianType>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const LocalGuardianSchema = new mongoose.Schema<LocalGuardianType>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const StudentSchema = new mongoose.Schema<StudentInterface>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
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
    guardian: {
      type: GuardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
    admissionSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
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
StudentSchema.virtual('fullName').get(function () {
  const { firstName, middleName, lastName } = this.name;
  return `${firstName} ${middleName ? middleName : ''} ${lastName}`;
});

// Query Middleware
StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = mongoose.model<StudentInterface>(
  'Student',
  StudentSchema,
);
