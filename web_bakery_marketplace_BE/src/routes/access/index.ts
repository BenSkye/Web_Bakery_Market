import { Router } from 'express';
import accessController from '../../controllers/access.controller';

const accessRouter = Router();

//signup
accessRouter.post('/user/signup', accessController.signUp);

export default accessRouter;
