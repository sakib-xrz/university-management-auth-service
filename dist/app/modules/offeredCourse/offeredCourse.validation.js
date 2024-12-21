"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const offeredCourse_constant_1 = __importDefault(require("./offeredCourse.constant"));
const TimeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
const CreateSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        semesterRegistration: zod_1.z.string({
            required_error: 'Semester registration id is required',
            invalid_type_error: 'Semester registration id must be a string',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'Academic faculty id is required',
            invalid_type_error: 'Academic faculty id must be a string',
        }),
        academicDepartment: zod_1.z.string({
            required_error: 'Academic department id is required',
            invalid_type_error: 'Academic department id must be a string',
        }),
        course: zod_1.z.string({
            required_error: 'Course id is required',
            invalid_type_error: 'Course id must be a string',
        }),
        faculty: zod_1.z.string({
            required_error: 'Faculty id is required',
            invalid_type_error: 'Faculty id must be a string',
        }),
        maxCapacity: zod_1.z.number({
            required_error: 'Max capacity is required',
            invalid_type_error: 'Max capacity must be a number',
        }),
        section: zod_1.z.string({
            required_error: 'Section is required',
            invalid_type_error: 'Section must be a string',
        }),
        days: zod_1.z.array(zod_1.z.enum([...offeredCourse_constant_1.default.Days], {
            required_error: 'Days are required',
            invalid_type_error: 'Days must be an array of strings',
        })),
        startTime: TimeStringSchema,
        endTime: TimeStringSchema,
    })
        .refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'End time must be greater than start time',
    }),
});
const OfferedCourseValidation = {
    CreateSchema,
};
exports.default = OfferedCourseValidation;
