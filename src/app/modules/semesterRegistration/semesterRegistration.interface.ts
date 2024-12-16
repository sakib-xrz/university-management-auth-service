import { Types } from 'mongoose';

export type StatusType = 'UPCOMING' | 'ONGOING' | 'ENDED';

export interface SemesterRegistrationInterface {
  academicSemester: Types.ObjectId;
  status: StatusType;
  startDateTime: Date;
  endDateTime: Date;
  minCredit: number;
  maxCredit: number;
}
