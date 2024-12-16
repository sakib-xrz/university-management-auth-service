import { z } from 'zod';
import SemesterRegistrationConstants from './semesterRegistration.constant';

const CreateSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'Academic semester id is required',
      invalid_type_error: 'Academic semester id must be a string',
    }),
    status: z
      .enum(
        [...(SemesterRegistrationConstants.Status as [string, ...string[]])],
        {
          message:
            'Status must be one of the following values: UPCOMING, ONGOING, ENDED',
        },
      )
      .optional(),
    startDateTime: z
      .string({
        required_error: 'Start date time is required',
        invalid_type_error: 'Start date time must be a string',
      })
      .datetime({
        message: 'Start date time must be a valid date time',
      }),
    endDateTime: z
      .string({
        required_error: 'End date time is required',
        invalid_type_error: 'End date time must be a string',
      })
      .datetime({
        message: 'End date time must be a valid date time',
      }),
    minCredit: z
      .number({
        invalid_type_error: 'Min credit must be a number',
      })
      .optional(),
    maxCredit: z
      .number({
        invalid_type_error: 'Max credit must be a number',
      })
      .optional(),
  }),
});

const UpdateSchema = z.object({
  body: z.object({
    status: z
      .enum(
        [...(SemesterRegistrationConstants.Status as [string, ...string[]])],
        {
          message:
            'Status must be one of the following values: UPCOMING, ONGOING, ENDED',
        },
      )
      .optional(),
    startDateTime: z
      .string({
        invalid_type_error: 'Start date time must be a string',
      })
      .datetime({
        message: 'Start date time must be a valid date time',
      })
      .optional(),
    endDateTime: z
      .string({
        invalid_type_error: 'End date time must be a string',
      })
      .datetime({
        message: 'End date time must be a valid date time',
      })
      .optional(),
    minCredit: z
      .number({
        invalid_type_error: 'Min credit must be a number',
      })
      .optional(),
    maxCredit: z
      .number({
        invalid_type_error: 'Max credit must be a number',
      })
      .optional(),
  }),
});

const SemesterRegistrationValidation = { CreateSchema, UpdateSchema };

export default SemesterRegistrationValidation;
