import { Router } from 'express';
import accessController from '../../controllers/access.controller';
import router from '..';
import { authentication } from '../../auth/authUtils';

const accessRouter = Router();

//signup
accessRouter.post('/user/signup', accessController.signUp);
accessRouter.post('/user/login', accessController.login);

//authentication//
accessRouter.use(authentication);
////////////////////////////

accessRouter.post('/user/logout', accessController.logout);
accessRouter.post('/user/handleRefreshToken', accessController.handleRefreshToken);


export default accessRouter;
