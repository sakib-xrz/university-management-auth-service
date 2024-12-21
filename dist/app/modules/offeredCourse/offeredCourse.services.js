"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const course_model_1 = require("../course/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const CreateOfferedCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, } = payload;
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Semester Registration not found');
    }
    const academicSemester = isSemesterRegistrationExist.academicSemester;
    const isAcademicFacultyExist = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Faculty not found');
    }
    const isAcademicDepartmentExist = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Department not found');
    }
    const isCourseExist = yield course_model_1.Course.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    const isFacultyExists = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    const isDepartmentExistOnFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty,
    });
    if (!isDepartmentExistOnFaculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Department not found under the faculty');
    }
    const isOfferedCourseExistWithSameSemesterCourseAndSection = yield offeredCourse_model_1.OfferedCourse.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isOfferedCourseExistWithSameSemesterCourseAndSection) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Offered Course already exist with same semester, course and section');
    }
    const result = yield offeredCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
const OfferedCourseService = { CreateOfferedCourse };
exports.default = OfferedCourseService;
