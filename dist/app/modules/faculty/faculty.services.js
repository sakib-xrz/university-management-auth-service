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
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const faculty_constant_1 = __importDefault(require("./faculty.constant"));
const faculty_model_1 = require("./faculty.model");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const GetFaculties = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find().populate({
        path: 'academicDepartment',
        populate: {
            path: 'faculty',
        },
    }), query)
        .search(faculty_constant_1.default.FacultySearchableFields)
        .sort()
        .paginate()
        .fields();
    const faculties = yield facultyQuery.modelQuery.exec();
    const total = yield facultyQuery.getCountQuery();
    const { page, limit } = facultyQuery.getPaginationInfo();
    return {
        data: faculties,
        meta: {
            total,
            page,
            limit,
        },
    };
});
const GetFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_model_1.Faculty.findOne({
        id,
    });
    if (!faculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    return faculty;
});
const UpdateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_model_1.Faculty.findOne({ id });
    if (!faculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    const { name } = payload, reamingFields = __rest(payload, ["name"]);
    const modifiedPayload = Object.assign({}, reamingFields);
    if (name && Object.keys(name).length > 0) {
        for (const [key, value] of Object.entries(name)) {
            modifiedPayload[`name.${key}`] = value;
        }
    }
    const updatedFaculty = yield faculty_model_1.Faculty.findOneAndUpdate({ id }, modifiedPayload, { new: true, runValidators: true });
    return updatedFaculty;
});
const DeleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_model_1.Faculty.findOne({ id });
    if (!faculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedFaculty = yield faculty_model_1.Faculty.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, runValidators: true, session });
        if (!deletedFaculty) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete faculty');
        }
        const user = yield user_model_1.User.findOneAndUpdate({ id: faculty.id }, { isDeleted: true }, { new: true, runValidators: true, session });
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
const FacultyService = {
    GetFaculties,
    GetFacultyById,
    UpdateFaculty,
    DeleteFaculty,
};
exports.default = FacultyService;
