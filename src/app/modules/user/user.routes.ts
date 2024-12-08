import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserValidation from './user.validation';
import UserController from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.CreateStudent),
  UserController.CreateStudent,
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.CreateFaculty),
  UserController.CreateFaculty,
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.CreateAdmin),
  UserController.CreateAdmin,
);

export const UserRoutes = router;
