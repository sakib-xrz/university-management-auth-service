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

export const UserRoutes = router;
