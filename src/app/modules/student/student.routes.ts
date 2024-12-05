import express from 'express';
import StudentController from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import StudentValidation from './student.validation';

const router = express.Router();

router.get('/', StudentController.GetStudents);

router
  .route('/:id')
  .get(StudentController.GetStudentById)
  .patch(
    validateRequest(StudentValidation.UpdateStudent),
    StudentController.UpdateStudent,
  );

export const StudentRoutes = router;
