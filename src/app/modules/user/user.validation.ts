import { z } from 'zod';

const CreateStudent = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be at least 6 characters long')
      .optional(),
    student: z.object({
      name: z.object(
        {
          firstName: z.string({
            required_error: 'First name is required',
            invalid_type_error: 'First name must be a string',
          }),
          middleName: z
            .string({
              invalid_type_error: 'Middle name must be a string',
            })
            .optional(),
          lastName: z.string({
            required_error: 'Last name is required',
            invalid_type_error: 'Last name must be a string',
          }),
        },
        {
          required_error: 'Name is required',
        },
      ),
      gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
        required_error: 'Gender is required',
        invalid_type_error: "Gender must be 'MALE', 'FEMALE' or 'OTHER'",
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
        invalid_type_error: 'Date of birth must be a string',
      }),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email address'),
      contactNo: z.string({
        required_error: 'Contact number is required',
        invalid_type_error: 'Contact number must be a string',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
        invalid_type_error: 'Emergency contact number must be a string',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          invalid_type_error:
            "Blood group must be 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
        invalid_type_error: 'Present address must be a string',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
        invalid_type_error: 'Permanent address must be a string',
      }),
      guardian: z.object(
        {
          fatherName: z.string({
            required_error: 'Father name is required',
            invalid_type_error: 'Father name must be a string',
          }),
          fatherOccupation: z.string({
            required_error: 'Father occupation is required',
            invalid_type_error: 'Father occupation must be a string',
          }),
          fatherContactNo: z.string({
            required_error: 'Father contact number is required',
            invalid_type_error: 'Father contact number must be a string',
          }),
          motherName: z.string({
            required_error: 'Mother name is required',
            invalid_type_error: 'Mother name must be a string',
          }),
          motherOccupation: z.string({
            required_error: 'Mother occupation is required',
            invalid_type_error: 'Mother occupation must be a string',
          }),
          motherContactNo: z.string({
            required_error: 'Mother contact number is required',
            invalid_type_error: 'Mother contact number must be a string',
          }),
        },
        {
          required_error: 'Guardian details are required',
        },
      ),
      localGuardian: z.object(
        {
          name: z.string({
            required_error: 'Local guardian name is required',
            invalid_type_error: 'Local guardian name must be a string',
          }),
          occupation: z.string({
            required_error: 'Local guardian occupation is required',
            invalid_type_error: 'Local guardian occupation must be a string',
          }),
          contactNo: z.string({
            required_error: 'Local guardian contact number is required',
            invalid_type_error:
              'Local guardian contact number must be a string',
          }),
          address: z.string({
            required_error: 'Local guardian address is required',
            invalid_type_error: 'Local guardian address must be a string',
          }),
        },
        {
          required_error: 'Local guardian details are required',
        },
      ),
      admissionSemester: z.string({
        required_error: 'Admission semester is required',
        invalid_type_error: 'Admission semester must be a string',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
        invalid_type_error: 'Academic department must be a string',
      }),
    }),
  }),
});

const UserValidation = { CreateStudent };

export default UserValidation;
