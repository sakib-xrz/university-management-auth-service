export type MonthsType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type AcademicSemesterNameType = 'Autumn' | 'Summer' | 'Fall';
export type AcademicSemesterCodeType = '01' | '02' | '03';

export type AcademicSemesterNameCodeMapperType = {
  Autumn: '01';
  Summer: '02';
  Fall: '03';
};

export interface AcademicSemesterInterface {
  name: AcademicSemesterNameType;
  code: AcademicSemesterCodeType;
  year: string;
  startMonth: MonthsType;
  endMonth: MonthsType;
}
