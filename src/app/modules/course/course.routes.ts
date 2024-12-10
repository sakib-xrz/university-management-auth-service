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

router.put(
  '/:id/assign-faculty',
  validateRequest(CourseValidation.FacultyWithCourse),
  CourseController.AssignFacultyToCourse,
);

router.patch(
  '/:id/remove-faculty',
  validateRequest(CourseValidation.FacultyWithCourse),
  CourseController.RemoveFacultyFromCourse,
);

export const CourseRoutes = router;
