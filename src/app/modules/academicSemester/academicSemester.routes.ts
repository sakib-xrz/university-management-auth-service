import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicSemesterValidation from './academicSemester.validation';
import AcademicSemesterController from './academicSemester.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(AcademicSemesterValidation.CreateAcademicSemester),
    AcademicSemesterController.CreateAcademicSemester,
  )
  .get(AcademicSemesterController.GetAcademicSemesters);

router
  .route('/:id')
  .get(AcademicSemesterController.GetAcademicSemesterById)
  .patch(
    validateRequest(AcademicSemesterValidation.UpdateAcademicSemester),
    AcademicSemesterController.UpdateAcademicSemester,
  );

export const AcademicSemesterRoutes = router;
