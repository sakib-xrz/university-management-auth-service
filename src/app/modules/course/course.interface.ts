import { Types } from 'mongoose';

export type PrerequisiteCourseType = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export interface CourseInterface {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  prerequisiteCourses?: PrerequisiteCourseType[];
}
