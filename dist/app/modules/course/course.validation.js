"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const CreateCourse = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default
            .string({
            required_error: 'Course title is required',
            invalid_type_error: 'Course title must be a string',
        })
            .min(3, 'Course title is too short')
            .max(255, 'Course title is too long'),
        prefix: zod_1.default.string({
            required_error: 'Course prefix is required',
            invalid_type_error: 'Course prefix must be a string',
        }),
        code: zod_1.default.number({
            required_error: 'Course code is required',
            invalid_type_error: 'Course code must be a number',
        }),
        credits: zod_1.default
            .number({
            required_error: 'Course credits is required',
            invalid_type_error: 'Course credits must be a number',
        })
            .nonnegative('Course credits must be zero or a positive number'),
        prerequisiteCourses: zod_1.default
            .array(zod_1.default.object({
            course: zod_1.default.string({
                required_error: 'Prerequisite course is required',
                invalid_type_error: 'Prerequisite course must be a string',
            }),
        }))
            .optional(),
    }),
});
const UpdateCourse = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default
            .string({
            invalid_type_error: 'Course title must be a string',
        })
            .min(3, 'Course title is too short')
            .max(255, 'Course title is too long')
            .optional(),
        prefix: zod_1.default
            .string({
            invalid_type_error: 'Course prefix must be a string',
        })
            .optional(),
        code: zod_1.default
            .number({
            invalid_type_error: 'Course code must be a number',
        })
            .optional(),
        credits: zod_1.default
            .number({
            required_error: 'Course credits is required',
            invalid_type_error: 'Course credits must be a number',
        })
            .nonnegative('Course credits must be zero or a positive number')
            .optional(),
        prerequisiteCourses: zod_1.default
            .array(zod_1.default.object({
            course: zod_1.default.string({
                required_error: 'Prerequisite course is required',
                invalid_type_error: 'Prerequisite course must be a string',
            }),
            isDeleted: zod_1.default.boolean({
                required_error: 'isDeleted is required',
                invalid_type_error: 'isDeleted must be a boolean',
            }),
        }))
            .optional(),
    }),
});
const FacultyWithCourse = zod_1.default.object({
    body: zod_1.default.object({
        faculties: zod_1.default.array(zod_1.default.string({
            required_error: 'Faculty id is required',
            invalid_type_error: 'Faculty id must be a string',
        })),
    }),
});
const CourseValidation = { CreateCourse, UpdateCourse, FacultyWithCourse };
exports.default = CourseValidation;
