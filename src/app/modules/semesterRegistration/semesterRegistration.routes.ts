import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import SemesterRegistrationValidation from './semesterRegistration.validation';
import SemesterRegistrationController from './semesterRegistration.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(SemesterRegistrationValidation.CreateSchema),
    SemesterRegistrationController.CreateSemesterRegistration,
  )
  .get(SemesterRegistrationController.GetAllSemesterRegistrations);

router
  .route('/:id')
  .get(SemesterRegistrationController.GetSemesterRegistration);

export const SemesterRegistrationRoutes = router;
