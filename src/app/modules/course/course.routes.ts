import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import CourseValidation from './course.validation';
import CourseController from './course.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(CourseValidation.CreateCourse),
    CourseController.CreateCourse,
  )
  .get(CourseController.GetCourses);

router
  .route('/:id')
  .get(CourseController.GetCourseById)
  .patch(
    validateRequest(CourseValidation.UpdateCourse),
    CourseController.UpdateCourse,
  )
  .delete(CourseController.DeleteCourse);

export const CourseRoutes = router;
