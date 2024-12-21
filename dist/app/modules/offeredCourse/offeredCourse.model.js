"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const offeredCourse_constant_1 = __importDefault(require("./offeredCourse.constant"));
const OfferedCourseSchema = new mongoose_1.default.Schema({
    semesterRegistration: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'SemesterRegistration',
        required: true,
    },
    academicSemester: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    faculty: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    days: {
        type: [String],
        enum: offeredCourse_constant_1.default.Days,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
});
exports.OfferedCourse = mongoose_1.default.model('OfferedCourse', OfferedCourseSchema);
