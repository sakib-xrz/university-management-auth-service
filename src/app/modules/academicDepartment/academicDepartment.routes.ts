import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicDepartmentValidation from './academicDepartment.validation';
import AcademicDepartmentController from './academicDepartment.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // validateRequest(AcademicDepartmentValidation.CreateAcademicDepartment),
    AcademicDepartmentController.CreateAcademicDepartment,
  )
  .get(AcademicDepartmentController.GetAcademicDepartments);

router
  .route('/:id')
  .get(AcademicDepartmentController.GetAcademicDepartment)
  .patch(
    validateRequest(AcademicDepartmentValidation.UpdateAcademicDepartment),
    AcademicDepartmentController.UpdateAcademicDepartment,
  );

export const AcademicDepartmentRoutes = router;
