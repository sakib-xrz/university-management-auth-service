"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateStudent = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({
            invalid_type_error: 'Password must be a string',
        })
            .min(6, 'Password must be at least 6 characters long')
            .optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                    invalid_type_error: 'First name must be a string',
                }),
                middleName: zod_1.z
                    .string({
                    invalid_type_error: 'Middle name must be a string',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                    invalid_type_error: 'Last name must be a string',
                }),
            }, {
                required_error: 'Name is required',
            }),
            gender: zod_1.z.enum(['MALE', 'FEMALE', 'OTHER'], {
                required_error: 'Gender is required',
                invalid_type_error: "Gender must be 'MALE', 'FEMALE' or 'OTHER'",
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
                invalid_type_error: 'Date of birth must be a string',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
                .email('Invalid email address'),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
                invalid_type_error: 'Contact number must be a string',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
                invalid_type_error: 'Emergency contact number must be a string',
            }),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
                invalid_type_error: "Blood group must be 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
            })
                .optional(),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
                invalid_type_error: 'Present address must be a string',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
                invalid_type_error: 'Permanent address must be a string',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father name is required',
                    invalid_type_error: 'Father name must be a string',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation is required',
                    invalid_type_error: 'Father occupation must be a string',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact number is required',
                    invalid_type_error: 'Father contact number must be a string',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother name is required',
                    invalid_type_error: 'Mother name must be a string',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required',
                    invalid_type_error: 'Mother occupation must be a string',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact number is required',
                    invalid_type_error: 'Mother contact number must be a string',
                }),
            }, {
                required_error: 'Guardian details are required',
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local guardian name is required',
                    invalid_type_error: 'Local guardian name must be a string',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local guardian occupation is required',
                    invalid_type_error: 'Local guardian occupation must be a string',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local guardian contact number is required',
                    invalid_type_error: 'Local guardian contact number must be a string',
                }),
                address: zod_1.z.string({
                    required_error: 'Local guardian address is required',
                    invalid_type_error: 'Local guardian address must be a string',
                }),
            }, {
                required_error: 'Local guardian details are required',
            }),
            admissionSemester: zod_1.z.string({
                required_error: 'Admission semester is required',
                invalid_type_error: 'Admission semester must be a string',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
                invalid_type_error: 'Academic department must be a string',
            }),
        }),
    }),
});
const CreateFaculty = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({
            invalid_type_error: 'Password must be a string',
        })
            .min(6, 'Password must be at least 6 characters long')
            .optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                    invalid_type_error: 'First name must be a string',
                }),
                middleName: zod_1.z
                    .string({
                    invalid_type_error: 'Middle name must be a string',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                    invalid_type_error: 'Last name must be a string',
                }),
            }, {
                required_error: 'Name is required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
                invalid_type_error: 'Designation must be a string',
            }),
            gender: zod_1.z.enum(['MALE', 'FEMALE', 'OTHER'], {
                required_error: 'Gender is required',
                invalid_type_error: "Gender must be 'MALE', 'FEMALE' or 'OTHER'",
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
                invalid_type_error: 'Date of birth must be a string',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
                .email('Invalid email address'),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
                invalid_type_error: 'Contact number must be a string',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
                invalid_type_error: 'Emergency contact number must be a string',
            }),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
                invalid_type_error: "Blood group must be 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
            })
                .optional(),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
                invalid_type_error: 'Present address must be a string',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
                invalid_type_error: 'Permanent address must be a string',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
                invalid_type_error: 'Academic department must be a string',
            }),
        }),
    }),
});
const CreateAdmin = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({
            invalid_type_error: 'Password must be a string',
        })
            .min(6, 'Password must be at least 6 characters long')
            .optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                    invalid_type_error: 'First name must be a string',
                }),
                middleName: zod_1.z
                    .string({
                    invalid_type_error: 'Middle name must be a string',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                    invalid_type_error: 'Last name must be a string',
                }),
            }, {
                required_error: 'Name is required',
            }),
            gender: zod_1.z.enum(['MALE', 'FEMALE', 'OTHER'], {
                required_error: 'Gender is required',
                invalid_type_error: "Gender must be 'MALE', 'FEMALE' or 'OTHER'",
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
                invalid_type_error: 'Date of birth must be a string',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
                .email('Invalid email address'),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
                invalid_type_error: 'Contact number must be a string',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
                invalid_type_error: 'Emergency contact number must be a string',
            }),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
                invalid_type_error: "Blood group must be 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
            })
                .optional(),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
                invalid_type_error: 'Present address must be a string',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
                invalid_type_error: 'Permanent address must be a string',
            }),
        }),
    }),
});
const UserValidation = { CreateStudent, CreateFaculty, CreateAdmin };
exports.default = UserValidation;
