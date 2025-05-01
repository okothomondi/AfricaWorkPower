import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();

router.get('/', UsersController.getUsers);

export default router;
