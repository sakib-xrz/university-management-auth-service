"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Months = [
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
const AcademicSemesterName = [
    'Autumn',
    'Summer',
    'Fall',
];
const AcademicSemesterCode = ['01', '02', '03'];
const AcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
const AcademicSemesterConstants = {
    Months,
    AcademicSemesterName,
    AcademicSemesterCode,
    AcademicSemesterNameCodeMapper,
};
exports.default = AcademicSemesterConstants;
