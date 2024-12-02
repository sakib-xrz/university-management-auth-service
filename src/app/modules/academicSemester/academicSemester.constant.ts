import {
  AcademicSemesterCodeType,
  AcademicSemesterNameCodeMapperType,
  AcademicSemesterNameType,
  MonthsType,
} from './academicSemester.interface';

const Months: MonthsType[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemesterName: AcademicSemesterNameType[] = [
  'Autumn',
  'Summer',
  'Fall',
];

const AcademicSemesterCode: AcademicSemesterCodeType[] = ['01', '02', '03'];

const AcademicSemesterNameCodeMapper: AcademicSemesterNameCodeMapperType = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const AcademicSemesterConstants = {
  Months,
  AcademicSemesterName,
  AcademicSemesterCode,
  AcademicSemesterNameCodeMapper,
};
