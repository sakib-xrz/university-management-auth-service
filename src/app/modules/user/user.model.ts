import mongoose from 'mongoose';
import { UserInterface } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const { bcrypt_salt_rounds } = config;

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

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(bcrypt_salt_rounds));
  next();
});

export const User = mongoose.model<UserInterface>('User', UserSchema);
