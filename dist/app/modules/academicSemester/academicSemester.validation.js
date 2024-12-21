"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const academicSemester_constant_1 = __importDefault(require("./academicSemester.constant"));
const { AcademicSemesterName, AcademicSemesterCode, Months } = academicSemester_constant_1.default;
const CreateAcademicSemester = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...AcademicSemesterName], {
            message: 'Invalid Academic Semester Name',
        }),
        code: zod_1.z.enum([...AcademicSemesterCode], {
            message: 'Invalid Academic Semester Code',
        }),
        year: zod_1.z.string().min(4).max(4),
        startMonth: zod_1.z.enum([...Months], {
            message: 'Invalid Start Month',
        }),
        endMonth: zod_1.z.enum([...Months], {
            message: 'Invalid End Month',
        }),
    }),
});
const UpdateAcademicSemester = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .enum([...AcademicSemesterName], {
            message: 'Invalid Academic Semester Name',
        })
            .optional(),
        code: zod_1.z
            .enum([...AcademicSemesterCode], {
            message: 'Invalid Academic Semester Code',
        })
            .optional(),
        year: zod_1.z
            .string()
            .min(4, { message: 'Year must be 4 characters' })
            .max(4)
            .optional(),
        startMonth: zod_1.z
            .enum([...Months], {
            message: 'Invalid Start Month',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...Months], {
            message: 'Invalid End Month',
        })
            .optional(),
    })
        .refine((data) => !(data.name && !data.code) && !(data.code && !data.name), {
        message: 'Name and Code must be updated together',
        path: ['name'],
    }),
});
const AcademicSemesterValidation = {
    CreateAcademicSemester,
    UpdateAcademicSemester,
};
exports.default = AcademicSemesterValidation;
