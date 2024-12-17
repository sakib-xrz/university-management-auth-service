import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import OfferedCourseValidation from './offeredCourse.validation';
import OfferedCourseController from './offeredCourse.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(OfferedCourseValidation.CreateSchema),
    OfferedCourseController.CreateOfferedCourse,
  );

export const OfferedCourseRoutes = router;
