import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';





const UserSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: [true, 'User name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangeAt: {
      type: Date,
      default: null,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc

  // Check if the password is modified or it's a new user
  if (!user.isModified('password')) {
    return next();
  }

  // Add your password strength rules here
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  if (!passwordRegex.test(user?.password)) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        'Validation Error',
        `Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        {},
      ),
    );
  }

  // hashing password and save into DB
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  user.password = hashedPassword;
  next();
});

// set '' after saving password
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isPasswordValid = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return bcrypt.compare(plainTextPassword, hashPassword);
};

UserSchema.statics.isJwtIssuedBeforePasswordChanged = async function (
  passwordChangeAtTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const convertPasswordChangeAtTimeStampToMilliseconds =
    new Date(passwordChangeAtTimeStamp).getTime() / 1000; // because jwtIssuedTimeStamp is seconds

  const compareTime =
    convertPasswordChangeAtTimeStampToMilliseconds > jwtIssuedTimeStamp;

  return compareTime;
};

const User = model<TUser, UserModel>('User', UserSchema);

export default User;
