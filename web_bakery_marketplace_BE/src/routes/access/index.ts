import { Router } from 'express';
import accessController from '../../controllers/access.controller';
import router from '..';
import { authentication } from '../../auth/authUtils';

const accessRouter = Router();

//signup
accessRouter.post('/signup', accessController.signUp);
accessRouter.post('/login', accessController.login);

//authentication//
accessRouter.use(authentication);
////////////////////////////

accessRouter.post('/logout', accessController.logout);
accessRouter.post('/handleRefreshToken', accessController.handleRefreshToken);


export default accessRouter;
