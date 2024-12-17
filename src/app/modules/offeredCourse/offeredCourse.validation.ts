import { z } from 'zod';
import OfferedCourseConstants from './offeredCourse.constant';

const TimeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const CreateSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string({
        required_error: 'Semester registration id is required',
        invalid_type_error: 'Semester registration id must be a string',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty id is required',
        invalid_type_error: 'Academic faculty id must be a string',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department id is required',
        invalid_type_error: 'Academic department id must be a string',
      }),
      course: z.string({
        required_error: 'Course id is required',
        invalid_type_error: 'Course id must be a string',
      }),
      faculty: z.string({
        required_error: 'Faculty id is required',
        invalid_type_error: 'Faculty id must be a string',
      }),
      maxCapacity: z.number({
        required_error: 'Max capacity is required',
        invalid_type_error: 'Max capacity must be a number',
      }),
      section: z.string({
        required_error: 'Section is required',
        invalid_type_error: 'Section must be a string',
      }),
      days: z.array(
        z.enum([...OfferedCourseConstants.Days] as [string, ...string[]], {
          required_error: 'Days are required',
          invalid_type_error: 'Days must be an array of strings',
        }),
      ),
      startTime: TimeStringSchema,
      endTime: TimeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'End time must be greater than start time',
      },
    ),
});

const OfferedCourseValidation = {
  CreateSchema,
};

export default OfferedCourseValidation;
