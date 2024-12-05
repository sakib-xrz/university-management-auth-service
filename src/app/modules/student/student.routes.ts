import express from 'express';
import StudentController from './student.controller';

const router = express.Router();

router.get('/', StudentController.GetStudents);

router.route('/:id').get(StudentController.GetStudentById);

export const StudentRoutes = router;
