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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const student_model_1 = require("./student.model");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_constant_1 = __importDefault(require("./student.constant"));
const GetStudents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find()
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'faculty',
        },
    }), query)
        .search(student_constant_1.default.StudentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const students = yield studentQuery.modelQuery.exec();
    const total = yield studentQuery.getCountQuery();
    const { page, limit } = studentQuery.getPaginationInfo();
    return {
        data: students,
        meta: {
            total,
            page,
            limit,
        },
    };
});
const GetStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findOne({
        id,
    });
    if (!student) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    return student;
});
const UpdateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findOne({ id });
    if (!student) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    // separate non primitive fields from the payload
    const { name, guardian, localGuardian } = payload, reamingFields = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedPayload = Object.assign({}, reamingFields);
    if (name && Object.keys(name).length > 0) {
        for (const [key, value] of Object.entries(name)) {
            modifiedPayload[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length > 0) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedPayload[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedPayload[`localGuardian.${key}`] = value;
        }
    }
    const updatedStudent = yield student_model_1.Student.findOneAndUpdate({ id }, modifiedPayload, {
        new: true,
        runValidators: true,
    });
    return updatedStudent;
});
const DeleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findOne({ id });
    if (!student) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, runValidators: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete student');
        }
        const user = yield user_model_1.User.findOneAndUpdate({ id: student.id }, { isDeleted: true }, { new: true, runValidators: true, session });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete user');
        }
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const StudentService = {
    GetStudents,
    GetStudentById,
    UpdateStudent,
    DeleteStudent,
};
exports.default = StudentService;
