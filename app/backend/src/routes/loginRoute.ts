import { Router } from 'express';
import { authToken } from '../middlewares/token';
import checkCredentials from '../middlewares/cretendials';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();
const loginRoute = Router();

loginRoute.post('/', checkCredentials, loginController.newLogin);

loginRoute.get('/validate', authToken, loginController.validateLogin);

export default loginRoute;
