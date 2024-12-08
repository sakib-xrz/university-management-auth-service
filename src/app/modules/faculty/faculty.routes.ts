import express from 'express';
import FacultyController from './faculty.controller';

const router = express.Router();

router.get('/', FacultyController.GetFaculties);

router
  .route('/:id')
  .get(FacultyController.GetFacultyById)
  .patch(FacultyController.UpdateFaculty)
  .delete(FacultyController.DeleteFaculty);

export const FacultyRoutes = router;
