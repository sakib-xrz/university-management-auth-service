import mongoose from 'mongoose';
import { UsersInterface } from './users.interface';

const UsersSchema = new mongoose.Schema<UsersInterface>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['SUPER_ADMIN', 'ADMIN', 'FACULTY', 'STUDENT'],
    },
    status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'BLOCKED'],
    },
    isDeleted: {
      type: Boolean,
      required: true,
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

export const Users = mongoose.model('Users', UsersSchema);
