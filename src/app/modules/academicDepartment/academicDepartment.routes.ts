import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicDepartmentValidation from './academicDepartment.validation';
import AcademicDepartmentController from './academicDepartment.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(AcademicDepartmentValidation.CreateAcademicDepartment),
    AcademicDepartmentController.CreateAcademicDepartment,
  );

export const AcademicDepartmentRoutes = router;
