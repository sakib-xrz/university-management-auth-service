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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const academicSemester_services_1 = __importDefault(require("./academicSemester.services"));
const CreateAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterData = req.body;
    const result = yield academicSemester_services_1.default.CreateAcademicSemester(academicSemesterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Academic Semester Created Successfully',
        data: result,
    });
}));
const GetAcademicSemesters = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesters = yield academicSemester_services_1.default.GetAcademicSemesters();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Semesters Fetched Successfully',
        data: academicSemesters,
    });
}));
const GetAcademicSemesterById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterId = req.params.id;
    const academicSemester = yield academicSemester_services_1.default.GetAcademicSemesterById(academicSemesterId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Semester Fetched Successfully',
        data: academicSemester,
    });
}));
const UpdateAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterId = req.params.id;
    const academicSemesterData = req.body;
    const academicSemester = yield academicSemester_services_1.default.UpdateAcademicSemester(academicSemesterId, academicSemesterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Semester Updated Successfully',
        data: academicSemester,
    });
}));
const AcademicSemesterController = {
    CreateAcademicSemester,
    GetAcademicSemesters,
    GetAcademicSemesterById,
    UpdateAcademicSemester,
};
exports.default = AcademicSemesterController;
