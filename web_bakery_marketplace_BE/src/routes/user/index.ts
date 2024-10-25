import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import userController from '../../controllers/user.controller';
import { apiKey, permission } from '../../auth/checkAuth';
const userRouter = Router();

//authentication//
userRouter.use(authentication);
////////////////////////////
userRouter.use(apiKey)
userRouter.use(permission('admin'));
userRouter.get('/get-all-user-by-role', userController.getAllUserByRole);
userRouter.get('/statis-user', userController.getStatisUser);

export default userRouter;
