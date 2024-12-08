import { Types } from 'mongoose';

export type GuardianType = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardianType = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface StudentInterface {
  id: string;
  user: Types.ObjectId;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: GuardianType;
  localGuardian: LocalGuardianType;
  profileImage: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}
