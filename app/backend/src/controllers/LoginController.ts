import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { generateToken } from '../middlewares/token';

export default class LoginController {
  public loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public newLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tryLogin = await this.loginService.userData({ email, password });

    if (!tryLogin) return res.status(401).json({ type: 'INVALID_USER_OR_PASSWORD' });

    const { id, role } = tryLogin;
    const token = generateToken(id, email, role);

    return res.status(200).json({ token });
  };
}
