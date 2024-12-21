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
exports.AcademicSemester = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const academicSemester_constant_1 = __importDefault(require("./academicSemester.constant"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const { Months } = academicSemester_constant_1.default;
const AcademicSemesterSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Autumn', 'Summer', 'Fall'],
    },
    code: {
        type: String,
        required: true,
        enum: ['01', '02', '03'],
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months,
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months,
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
});
AcademicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExistOnSameYear = yield exports.AcademicSemester.findOne({
            name: this.name,
            year: this.year,
        });
        if (isSemesterExistOnSameYear) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Semester already exist on this year');
        }
        next();
    });
});
exports.AcademicSemester = mongoose_1.default.model('AcademicSemester', AcademicSemesterSchema);
