/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserRole = 'user' | 'admin';



export type TUser = {
  username: string;
  email: string;
  password: string;
  passwordChangeAt: Date;
  role: TUserRole;
};

export interface UserModel extends Model<TUser> {
  isPasswordValid(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;

  isJwtIssuedBeforePasswordChanged(
    passwordChangeAtTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}
