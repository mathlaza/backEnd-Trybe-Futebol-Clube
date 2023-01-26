import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import ILogin from '../Interfaces/ILogin';

export default class LoginService {
  public userData = async (data: ILogin) => {
    const { email, password } = data;

    const userExists = await Users.findOne({ where: { email } });
    if (!userExists) return undefined;

    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) return undefined;

    return userExists;
  };
}
