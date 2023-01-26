import { RequestHandler } from 'express';

const checkCredentials: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /(.+)@(.+){2,}\.(.+){2,}/;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos os campos devem estar preenchidos!' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'Formato de e-mail inválido!' });
  }
  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'Sua senha deve ter pelo menos 6 caracteres!' });
  }
  next();
};

export default checkCredentials;
