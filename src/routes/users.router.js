import { Router } from 'express';
import * as controller from '../controllers/user.controllers.js';
import { passportCall } from '../utils/passportCall.js';
import { validateRegister } from '../middlewares/userFieldsValidator.js';

const userRouter = Router();

userRouter.post('/register', passportCall('register'), validateRegister, controller.registerResponse);

userRouter.post('/login', passportCall('login'), controller.loginResponse);

userRouter.get('/current', passportCall('current'), controller.current);

userRouter.get('/logout', passportCall('current'), controller.logOut)

export default userRouter;
