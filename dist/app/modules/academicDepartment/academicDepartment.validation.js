"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateAcademicDepartment = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Academic Department name is required',
            invalid_type_error: 'Academic Department name must be a string',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'Academic Faculty id is required',
            invalid_type_error: 'Academic Faculty id must be a string',
        }),
    }),
});
const UpdateAcademicDepartment = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Academic Department name must be a string',
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            invalid_type_error: 'Academic Faculty id must be a string',
        })
            .optional(),
    }),
});
const AcademicDepartmentValidation = {
    CreateAcademicDepartment,
    UpdateAcademicDepartment,
};
exports.default = AcademicDepartmentValidation;
