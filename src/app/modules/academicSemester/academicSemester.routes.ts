import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicSemesterValidation from './academicSemester.validation';
import AcademicSemesterController from './academicSemester.controller';

const router = express.Router();

router.get(
  '/',
  validateRequest(AcademicSemesterValidation.CreateAcademicSemester),
  AcademicSemesterController.CreateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
