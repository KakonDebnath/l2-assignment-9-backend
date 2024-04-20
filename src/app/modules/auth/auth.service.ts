import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';

const registerUser = async (payload: TUser) => {
  // set role if role is not existing on payload
  if (!payload.role) {
    payload.role = 'user';
  }
  const result = await User.create(payload);

  // Use select to exclude 'password' and "passwordVersions" field
  const resultWithoutPassword = await User.findById(result?._id).select(
    '-password -passwordVersions -__v',
  );

  return resultWithoutPassword;
};
const loginUser = async (payload: TLoginUser) => {
  // Check if the user is exist
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not Found',
      'User not found!',
      {},
    );
  }

  // check if the password is valid
  const isPasswordValid = await User.isPasswordValid(
    payload?.password,
    user?.password,
  );
  if (!isPasswordValid) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Validation Error',
      'Password does not match',
      {},
    );
  }

  // create jwt token and send it to the client
  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const newUser = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  return {
    user: newUser,
    token: accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
