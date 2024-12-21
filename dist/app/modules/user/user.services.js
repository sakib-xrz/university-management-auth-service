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
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const user_utils_1 = __importDefault(require("./user.utils"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const student_model_1 = require("../student/student.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const { default_student_password, default_faculty_password, default_admin_password, } = config_1.default;
const CreateStudent = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    if (!academicSemester) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid academic semester');
    }
    const studentId = yield user_utils_1.default.generateStudentId(academicSemester);
    const userData = {};
    userData.password = password || default_student_password;
    userData.role = 'STUDENT';
    userData.id = studentId;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield user_model_1.User.create([userData], { session });
        if (!user.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        const student = yield student_model_1.Student.create([
            Object.assign(Object.assign({}, payload), { id: studentId, user: user[0]._id }),
        ], { session });
        if (!student.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        yield session.commitTransaction();
        session.endSession();
        return student[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const CreateFaculty = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid academic department');
    }
    const facultyId = yield user_utils_1.default.generateFacultyId();
    const userData = {};
    userData.password = password || default_faculty_password;
    userData.role = 'FACULTY';
    userData.id = facultyId;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield user_model_1.User.create([userData], { session });
        if (!user.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        const faculty = yield faculty_model_1.Faculty.create([
            Object.assign(Object.assign({}, payload), { id: facultyId, user: user[0]._id }),
        ], { session });
        if (!faculty.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        session.endSession();
        return faculty[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const CreateAdmin = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = yield user_utils_1.default.generateAdminId();
    const userData = {};
    userData.password = password || default_admin_password;
    userData.role = 'ADMIN';
    userData.id = adminId;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield user_model_1.User.create([userData], { session });
        if (!user.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        const admin = yield admin_model_1.Admin.create([
            Object.assign(Object.assign({}, payload), { id: adminId, user: user[0]._id }),
        ], { session });
        if (!admin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        session.endSession();
        return admin[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const UserService = { CreateStudent, CreateFaculty, CreateAdmin };
exports.default = UserService;
