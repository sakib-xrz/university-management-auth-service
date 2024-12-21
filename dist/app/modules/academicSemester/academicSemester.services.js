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
const academicSemester_model_1 = require("./academicSemester.model");
const academicSemester_constant_1 = __importDefault(require("./academicSemester.constant"));
const CreateAcademicSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name &&
        academicSemester_constant_1.default.AcademicSemesterNameCodeMapper[payload.name] !==
            payload.code) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Academic Semester name doesn't match with the code");
    }
    const result = yield academicSemester_model_1.AcademicSemester.create(payload);
    return result;
});
const GetAcademicSemesters = () => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesters = yield academicSemester_model_1.AcademicSemester.find({});
    return academicSemesters;
});
const GetAcademicSemesterById = (academicSemesterId) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(academicSemesterId);
    if (!academicSemester) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Semester not found');
    }
    return academicSemester;
});
const UpdateAcademicSemester = (academicSemesterId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(academicSemesterId);
    if (!academicSemester) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Semester not found');
    }
    if (payload.name &&
        academicSemester_constant_1.default.AcademicSemesterNameCodeMapper[payload.name] !==
            payload.code) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Academic Semester name doesn't match with the code");
    }
    const result = yield academicSemester_model_1.AcademicSemester.findByIdAndUpdate(academicSemesterId, payload, { new: true, runValidators: true });
    return result;
});
const AcademicSemesterService = {
    CreateAcademicSemester,
    GetAcademicSemesters,
    GetAcademicSemesterById,
    UpdateAcademicSemester,
};
exports.default = AcademicSemesterService;
