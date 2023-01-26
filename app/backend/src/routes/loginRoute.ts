import { Router } from 'express';
import checkCredentials from '../middlewares/cretendials';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();
const routerLogin = Router();

routerLogin.post('/', checkCredentials, loginController.newLogin);

export default routerLogin;
