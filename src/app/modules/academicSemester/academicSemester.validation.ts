import { z } from 'zod';
import AcademicSemesterConstants from './academicSemester.constant';

const { AcademicSemesterName, AcademicSemesterCode, Months } =
  AcademicSemesterConstants;

const CreateAcademicSemester = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
      message: 'Invalid Academic Semester Name',
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      message: 'Invalid Academic Semester Code',
    }),
    year: z.string().min(4).max(4),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      message: 'Invalid Start Month',
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      message: 'Invalid End Month',
    }),
  }),
});

const UpdateAcademicSemester = z.object({
  body: z
    .object({
      name: z
        .enum([...AcademicSemesterName] as [string, ...string[]], {
          message: 'Invalid Academic Semester Name',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterCode] as [string, ...string[]], {
          message: 'Invalid Academic Semester Code',
        })
        .optional(),
      year: z
        .string()
        .min(4, { message: 'Year must be 4 characters' })
        .max(4)
        .optional(),
      startMonth: z
        .enum([...Months] as [string, ...string[]], {
          message: 'Invalid Start Month',
        })
        .optional(),
      endMonth: z
        .enum([...Months] as [string, ...string[]], {
          message: 'Invalid End Month',
        })
        .optional(),
    })
    .refine(
      (data) => !(data.name && !data.code) && !(data.code && !data.name),
      {
        message: 'Name and Code must be updated together',
        path: ['name'],
      },
    ),
});

const AcademicSemesterValidation = {
  CreateAcademicSemester,
  UpdateAcademicSemester,
};

export default AcademicSemesterValidation;
