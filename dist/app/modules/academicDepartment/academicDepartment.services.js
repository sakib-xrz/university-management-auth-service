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
const academicDepartment_model_1 = require("./academicDepartment.model");
const CreateAcademicDepartment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.create(payload);
    return result;
});
const GetAcademicDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.find();
    return result;
});
const GetAcademicDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No academic department found');
    }
    return result;
});
const UpdateAcademicDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name) {
        const isAcademicDepartmentExistsWithPayloadName = yield academicDepartment_model_1.AcademicDepartment.findOne({
            _id: { $ne: id },
            name: payload.name,
        });
        if (isAcademicDepartmentExistsWithPayloadName) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, 'This academic department is already exist!');
        }
    }
    const result = yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No academic department found');
    }
    return result;
});
const AcademicDepartmentService = {
    CreateAcademicDepartment,
    GetAcademicDepartments,
    GetAcademicDepartment,
    UpdateAcademicDepartment,
};
exports.default = AcademicDepartmentService;
