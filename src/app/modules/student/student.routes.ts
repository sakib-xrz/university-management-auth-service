import express from 'express';
import StudentController from './student.controller';

const router = express.Router();

router.get('/', StudentController.GetStudents);

export const StudentRoutes = router;
