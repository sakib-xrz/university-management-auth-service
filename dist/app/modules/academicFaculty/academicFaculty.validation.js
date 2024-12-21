"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateAcademicFaculty = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Academic Faculty Name is required',
            invalid_type_error: 'Academic Faculty Name must be a string',
        }),
    }),
});
const UpdateAcademicFaculty = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Academic Faculty Name is required',
            invalid_type_error: 'Academic Faculty Name must be a string',
        }),
    }),
});
const AcademicFacultyValidation = {
    CreateAcademicFaculty,
    UpdateAcademicFaculty,
};
exports.default = AcademicFacultyValidation;
