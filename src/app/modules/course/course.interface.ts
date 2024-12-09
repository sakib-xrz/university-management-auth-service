// | **Prefix** | **Code** | **Title**                        | **Credits** | **PreRequisiteCourses**
// |------------|----------|----------------------------------|-------------|-------------------------------
// | BASIC      | 100      | Basic Computer Skill             | 3           | -
// | HTML       | 101      | Hyper Text Markup Language       | 3           | BASIC100
// | CSS        | 102      | Cascading Style Sheet            | 3           | HTML101
// | CSS        | 103      | Bootstrap                        | 3           | CSS102
// | CSS        | 104      | Tailwind CSS                     | 3           | CSS102
// | CSS        | 105      | Daisy UI                         | 3           | CSS102, CSS104
// | JS         | 106      | Basic JavaScript                 | 3           | -
// | JS         | 107      | Problem Solving with JS          | 3           | JS106
// | JS         | 108      | DOM Manipulation                 | 3           | HTML101, CSS102
// | REACT      | 109      | Basic React                      | 3           | HTML101, CSS102, JS106, JS107, JS108
// | REACT      | 110      | React Router DOM                 | 3           | REACT109

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
