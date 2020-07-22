import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserDoc } from '../../models/user';

const createJwt = (user: UserDoc) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
  );
};

export const createSession = (req: Request, user: UserDoc) => {
  const jwt = createJwt(user);
  req.session = {
    jwt,
  };
};
