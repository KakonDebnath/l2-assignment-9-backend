import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../user/user.interface';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: {
    _id: Types.ObjectId;
    role: TUserRole;
    email: string;
  },
  jwt_secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(jwtPayload, jwt_secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
