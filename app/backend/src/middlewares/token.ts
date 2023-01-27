import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (id: number, email: string, role: string) => {
  const payload = { id, email, role };
  const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1000h' });
  return token;
};

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const verifyToken = jwt.verify(token, secret);
    req.body.user = verifyToken;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { generateToken, authToken };
