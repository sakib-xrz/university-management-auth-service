import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicFacultyValidation from './academicFaculty.validation';
import AcademicFacultyController from './academicFaculty.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(AcademicFacultyValidation.CreateAcademicFaculty),
    AcademicFacultyController.CreateAcademicFaculty,
  )
  .get(AcademicFacultyController.GetAcademicFaculties);

router
  .route('/:id')
  .get(AcademicFacultyController.GetAcademicFaculty)
  .patch(
    validateRequest(AcademicFacultyValidation.UpdateAcademicFaculty),
    AcademicFacultyController.UpdateAcademicFaculty,
  );

export const AcademicFacultyRoutes = router;
