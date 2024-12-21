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
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const CreateSemesterRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSemesterExist = yield academicSemester_model_1.AcademicSemester.findById(payload.academicSemester);
    if (!isSemesterExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Semester not found');
    }
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        academicSemester: payload.academicSemester,
    });
    if (isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Semester registration already exists for this semester');
    }
    const isAnyUpcomingOrOngingSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        status: { $in: ['UPCOMING', 'ONGOING'] },
    });
    if (isAnyUpcomingOrOngingSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `There is already an ${isAnyUpcomingOrOngingSemesterRegistrationExist.status} semester registration`);
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
const GetAllSemesterRegistrations = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const semesterRegistrations = yield semesterRegistrationQuery.modelQuery.exec();
    const total = yield semesterRegistrationQuery.getCountQuery();
    const { page, limit } = semesterRegistrationQuery.getPaginationInfo();
    return {
        data: semesterRegistrations,
        meta: {
            total,
            page,
            limit,
        },
    };
});
const GetSemesterRegistration = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findById(id).populate('academicSemester');
    if (!semesterRegistration) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Semester registration not found');
    }
    return semesterRegistration;
});
const UpdateSemesterRegistration = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    if (!semesterRegistration) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Semester registration not found');
    }
    if (semesterRegistration.status === 'ENDED') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Semester registration has already ended');
    }
    if (payload.status) {
        switch (semesterRegistration.status) {
            case 'UPCOMING': {
                if (payload.status === 'ENDED') {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Semester registration cannot be ended directly from upcoming');
                }
                break;
            }
            case 'ONGOING': {
                if (payload.status === 'UPCOMING') {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Semester registration cannot be moved to upcoming from ongoing');
                }
                break;
            }
            default:
                break;
        }
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const SemesterRegistrationService = {
    CreateSemesterRegistration,
    GetAllSemesterRegistrations,
    GetSemesterRegistration,
    UpdateSemesterRegistration,
};
exports.default = SemesterRegistrationService;
