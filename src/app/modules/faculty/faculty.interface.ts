import { Types } from 'mongoose';

export interface FacultyInterface {
  id: string;
  user: Types.ObjectId;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  designation: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}
