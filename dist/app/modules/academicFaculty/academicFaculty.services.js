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
const academicFaculty_model_1 = require("./academicFaculty.model");
const CreateAcademicFaculty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.create(payload);
    return result;
});
const GetAcademicFaculties = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.find();
    return result;
});
const GetAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    if (!result) {
        throw new Error('No academic faculty found');
    }
    return result;
});
const UpdateAcademicFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAcademicFacultyExistsWithPayloadName = yield academicFaculty_model_1.AcademicFaculty.findOne({
        _id: { $ne: id },
        name: payload.name,
    });
    if (isAcademicFacultyExistsWithPayloadName) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This academic faculty is already exist!');
    }
    const result = yield academicFaculty_model_1.AcademicFaculty.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No academic faculty found');
    }
    return result;
});
const AcademicFacultyService = {
    CreateAcademicFaculty,
    GetAcademicFaculties,
    GetAcademicFaculty,
    UpdateAcademicFaculty,
};
exports.default = AcademicFacultyService;
