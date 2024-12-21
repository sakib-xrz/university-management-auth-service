"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.CourseFaculty = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PrerequisiteCourseSchema = new mongoose_1.default.Schema({
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const CourseFacultySchema = new mongoose_1.default.Schema({
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
        required: true,
    },
    faculties: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Faculty',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
});
exports.CourseFaculty = mongoose_1.default.model('CourseFaculty', CourseFacultySchema);
const CourseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    prerequisiteCourses: {
        type: [PrerequisiteCourseSchema],
        default: [],
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
});
// Query Middleware
CourseSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
CourseSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
CourseSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Course = mongoose_1.default.model('Course', CourseSchema);
