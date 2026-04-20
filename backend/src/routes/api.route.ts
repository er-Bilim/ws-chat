import { Router } from 'express';
import usersRouter from './users/users.route.ts';

const apiRoute = Router();

apiRoute.use('/users', usersRouter);

export default apiRoute;
