import express from 'express';
import AdminController from './admin.controller';

const router = express.Router();

router.get('/', AdminController.GetAdmins);

router
  .route('/:id')
  .get(AdminController.GetAdminById)
  .patch(AdminController.UpdateAdmin)
  .delete(AdminController.DeleteAdmin);

export const AdminRoutes = router;
