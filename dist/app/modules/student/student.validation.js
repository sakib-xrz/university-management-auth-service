"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UpdateStudent = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({
                invalid_type_error: 'First name must be a string',
            })
                .optional(),
            middleName: zod_1.z
                .string({
                invalid_type_error: 'Middle name must be a string',
            })
                .optional(),
            lastName: zod_1.z.string({}).optional(),
        })
            .optional(),
        gender: zod_1.z
            .enum(['MALE', 'FEMALE', 'OTHER'], {
            invalid_type_error: "Gender must be 'MALE', 'FEMALE' or 'OTHER'",
        })
            .optional(),
        dateOfBirth: zod_1.z
            .string({
            invalid_type_error: 'Date of birth must be a string',
        })
            .optional(),
        email: zod_1.z
            .string({
            invalid_type_error: 'Email must be a string',
        })
            .email('Invalid email address')
            .optional(),
        contactNo: zod_1.z
            .string({
            invalid_type_error: 'Contact number must be a string',
        })
            .optional(),
        emergencyContactNo: zod_1.z
            .string({
            invalid_type_error: 'Emergency contact number must be a string',
        })
            .optional(),
        bloodGroup: zod_1.z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
            invalid_type_error: "Blood group must be 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
        })
            .optional(),
        presentAddress: zod_1.z
            .string({
            invalid_type_error: 'Present address must be a string',
        })
            .optional(),
        permanentAddress: zod_1.z
            .string({
            invalid_type_error: 'Permanent address must be a string',
        })
            .optional(),
        guardian: zod_1.z
            .object({
            fatherName: zod_1.z
                .string({
                invalid_type_error: 'Father name must be a string',
            })
                .optional(),
            fatherOccupation: zod_1.z
                .string({
                invalid_type_error: 'Father occupation must be a string',
            })
                .optional(),
            fatherContactNo: zod_1.z
                .string({
                invalid_type_error: 'Father contact number must be a string',
            })
                .optional(),
            motherName: zod_1.z
                .string({
                invalid_type_error: 'Mother name must be a string',
            })
                .optional(),
            motherOccupation: zod_1.z
                .string({
                invalid_type_error: 'Mother occupation must be a string',
            })
                .optional(),
            motherContactNo: zod_1.z
                .string({
                invalid_type_error: 'Mother contact number must be a string',
            })
                .optional(),
        })
            .optional(),
        localGuardian: zod_1.z
            .object({
            name: zod_1.z
                .string({
                invalid_type_error: 'Local guardian name must be a string',
            })
                .optional(),
            occupation: zod_1.z
                .string({
                invalid_type_error: 'Local guardian occupation must be a string',
            })
                .optional(),
            contactNo: zod_1.z
                .string({
                invalid_type_error: 'Local guardian contact number must be a string',
            })
                .optional(),
            address: zod_1.z
                .string({
                invalid_type_error: 'Local guardian address must be a string',
            })
                .optional(),
        })
            .optional(),
    }),
});
const StudentValidation = { UpdateStudent };
exports.default = StudentValidation;
