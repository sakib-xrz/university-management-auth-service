import mongoose from 'mongoose';
import { UserInterface } from './user.interface';

const UserSchema = new mongoose.Schema<UserInterface>(
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
      default: 'ACTIVE',
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

export const User = mongoose.model<UserInterface>('User', UserSchema);
