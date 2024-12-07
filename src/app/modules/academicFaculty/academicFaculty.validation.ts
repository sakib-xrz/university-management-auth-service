import { z } from 'zod';

const CreateAcademicFaculty = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic Faculty Name is required',
      invalid_type_error: 'Academic Faculty Name must be a string',
    }),
  }),
});

const UpdateAcademicFaculty = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic Faculty Name is required',
      invalid_type_error: 'Academic Faculty Name must be a string',
    }),
  }),
});

const AcademicFacultyValidation = {
  CreateAcademicFaculty,
  UpdateAcademicFaculty,
};

export default AcademicFacultyValidation;
