"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const semesterRegistration_constant_1 = __importDefault(require("./semesterRegistration.constant"));
const CreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string({
            required_error: 'Academic semester id is required',
            invalid_type_error: 'Academic semester id must be a string',
        }),
        status: zod_1.z
            .enum([...semesterRegistration_constant_1.default.Status], {
            message: 'Status must be one of the following values: UPCOMING, ONGOING, ENDED',
        })
            .optional(),
        startDateTime: zod_1.z
            .string({
            required_error: 'Start date time is required',
            invalid_type_error: 'Start date time must be a string',
        })
            .datetime({
            message: 'Start date time must be a valid date time',
        }),
        endDateTime: zod_1.z
            .string({
            required_error: 'End date time is required',
            invalid_type_error: 'End date time must be a string',
        })
            .datetime({
            message: 'End date time must be a valid date time',
        }),
        minCredit: zod_1.z
            .number({
            invalid_type_error: 'Min credit must be a number',
        })
            .optional(),
        maxCredit: zod_1.z
            .number({
            invalid_type_error: 'Max credit must be a number',
        })
            .optional(),
    }),
});
const UpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z
            .enum([...semesterRegistration_constant_1.default.Status], {
            message: 'Status must be one of the following values: UPCOMING, ONGOING, ENDED',
        })
            .optional(),
        startDateTime: zod_1.z
            .string({
            invalid_type_error: 'Start date time must be a string',
        })
            .datetime({
            message: 'Start date time must be a valid date time',
        })
            .optional(),
        endDateTime: zod_1.z
            .string({
            invalid_type_error: 'End date time must be a string',
        })
            .datetime({
            message: 'End date time must be a valid date time',
        })
            .optional(),
        minCredit: zod_1.z
            .number({
            invalid_type_error: 'Min credit must be a number',
        })
            .optional(),
        maxCredit: zod_1.z
            .number({
            invalid_type_error: 'Max credit must be a number',
        })
            .optional(),
    }),
});
const SemesterRegistrationValidation = { CreateSchema, UpdateSchema };
exports.default = SemesterRegistrationValidation;
