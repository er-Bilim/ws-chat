import { Document, Model, model, Schema, type HydratedDocument } from 'mongoose';
import type { IUser } from '../../types/user.types.ts';
import type { UserMethods } from './userModel.types.ts';
import regex from './regex/regex.ts';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../../config.ts';
import { MINUTES_15, WEEK } from '../../constants/constants.ts';

type UserModel = Model<IUser, {}, UserMethods>;

const UserSchema = new Schema<HydratedDocument<IUser>, UserModel, UserMethods>({
  avatar: {
    type: String,
    required: false,
    default: null,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return regex.username.test(value);
      },
      message: 'Username can only contain letters and numbers without spaces',
    },
  },

  phone_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return regex.phone_number.test(value);
      },
      message:
        'Phone number is not valid. Only Kyrgyzstan numbers are allowed :D',
    },
  },

  display_name: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return regex.display_name.test(value);
      },
      message: 'Display name can only contain letters and spaces',
    },
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },

  refreshToken: {
    type: String,
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const hash = await argon2.hash(this.password);
  return (this.password = hash);
});

UserSchema.set('toJSON', {
  transform(_doc, ret, _options) {
    const { password, __v, refreshToken, ...user } = ret;
    return user;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return argon2.verify(this.password, password);
};

UserSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({ _id: this._id }, config.refreshJWTSecret, {
    expiresIn: WEEK,
  });

  this.refreshToken = refreshToken;
  return refreshToken;
};

UserSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign({ _id: this._id }, config.accessJWTSecret, {
    expiresIn: MINUTES_15,
  });

  return accessToken;
};

UserSchema.path('username').validate({
  validator: async function (this: Document, username) {
    if (!this.isModified('username')) return true;
    const user = await User.exists({ username });
    return !user;
  },
  message: 'User already exists',
});

const User = model('User', UserSchema);

export default User;
