import { z } from 'zod';

const CreateAcademicDepartment = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic Department name is required',
      invalid_type_error: 'Academic Department name must be a string',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty id is required',
      invalid_type_error: 'Academic Faculty id must be a string',
    }),
  }),
});

const UpdateAcademicDepartment = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department name must be a string',
      })
      .optional(),
    academicFaculty: z
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

export default AcademicDepartmentValidation;
