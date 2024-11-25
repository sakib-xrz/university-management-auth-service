import { Router } from 'express';
import { UsersRoutes } from '../modules/users/users.routes';
import { StudentsRoutes } from '../modules/students/students.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/students',
    route: StudentsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
