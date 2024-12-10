import z from 'zod';

const CreateCourse = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Course title is required',
        invalid_type_error: 'Course title must be a string',
      })
      .min(3, 'Course title is too short')
      .max(255, 'Course title is too long'),
    prefix: z.string({
      required_error: 'Course prefix is required',
      invalid_type_error: 'Course prefix must be a string',
    }),
    code: z.number({
      required_error: 'Course code is required',
      invalid_type_error: 'Course code must be a number',
    }),
    credits: z
      .number({
        required_error: 'Course credits is required',
        invalid_type_error: 'Course credits must be a number',
      })
      .nonnegative('Course credits must be zero or a positive number'),
    prerequisiteCourses: z
      .array(
        z.object({
          course: z.string({
            required_error: 'Prerequisite course is required',
            invalid_type_error: 'Prerequisite course must be a string',
          }),
        }),
      )
      .optional(),
  }),
});

const UpdateCourse = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Course title must be a string',
      })
      .min(3, 'Course title is too short')
      .max(255, 'Course title is too long')
      .optional(),
    prefix: z
      .string({
        invalid_type_error: 'Course prefix must be a string',
      })
      .optional(),
    code: z
      .number({
        invalid_type_error: 'Course code must be a number',
      })
      .optional(),
    credits: z
      .number({
        required_error: 'Course credits is required',
        invalid_type_error: 'Course credits must be a number',
      })
      .nonnegative('Course credits must be zero or a positive number')
      .optional(),
    prerequisiteCourses: z
      .array(
        z.object({
          course: z.string({
            required_error: 'Prerequisite course is required',
            invalid_type_error: 'Prerequisite course must be a string',
          }),
          isDeleted: z.boolean({
            required_error: 'isDeleted is required',
            invalid_type_error: 'isDeleted must be a boolean',
          }),
        }),
      )
      .optional(),
  }),
});

const FacultyWithCourse = z.object({
  body: z.object({
    faculties: z.array(
      z.string({
        required_error: 'Faculty id is required',
        invalid_type_error: 'Faculty id must be a string',
      }),
    ),
  }),
});

const CourseValidation = { CreateCourse, UpdateCourse, FacultyWithCourse };

export default CourseValidation;
