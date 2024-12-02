import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/create-student', validateRequest(UserValidation.CreateStudent));

export const UserRoutes = router;
