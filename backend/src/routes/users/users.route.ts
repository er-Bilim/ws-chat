import { Router } from 'express';
import { imagesUpload } from '../../middlewares/multer.ts';
import UsersController from '../../controllers/user.controller.ts';
import auth from '../../middlewares/auth.ts';

const usersRouter = Router();

usersRouter.post(
  '/',
  imagesUpload.single('avatar'),
  UsersController.registration,
);

usersRouter.post('/sessions', UsersController.authentication);
usersRouter.delete('/sessions', auth, UsersController.logout);
usersRouter.post('/token', UsersController.token);

export default usersRouter;
