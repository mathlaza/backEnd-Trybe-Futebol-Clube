import { RequestHandler } from 'express';

const checkCredentials: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /(.+)@(.+){2,}\.(.+){2,}/;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!regex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default checkCredentials;
