import { z } from 'zod';

const UpdateAdmin = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            invalid_type_error: 'First name must be a string',
          })
          .optional(),
        middleName: z
          .string({
            invalid_type_error: 'Middle name must be a string',
          })
          .optional(),
        lastName: z.string({}).optional(),
      })
      .optional(),
    gender: z
      .enum(['MALE', 'FEMALE', 'OTHER'], {
        invalid_type_error: "Gender must be 'MALE', 'FEMALE' or 'OTHER'",
      })
      .optional(),
    dateOfBirth: z
      .string({
        invalid_type_error: 'Date of birth must be a string',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address')
      .optional(),
    contactNo: z
      .string({
        invalid_type_error: 'Contact number must be a string',
      })
      .optional(),
    emergencyContactNo: z
      .string({
        invalid_type_error: 'Emergency contact number must be a string',
      })
      .optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        invalid_type_error:
          "Blood group must be 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
      })
      .optional(),
    presentAddress: z
      .string({
        invalid_type_error: 'Present address must be a string',
      })
      .optional(),
    permanentAddress: z
      .string({
        invalid_type_error: 'Permanent address must be a string',
      })
      .optional(),
  }),
});

const AdminValidation = { UpdateAdmin };

export default AdminValidation;
