import { Document, model, models, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    picture: {
      type: String,
    },
    cursor: {
      type: String,
      default: null
    },
    cpf: {
      type: String,
    },
    email: {
      type: String,
      required: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    passwordResetExpires: {
      type: Number,
      default: null
    },
    passwordResetToken: {
      type: String,
      default: null
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  },
);

export interface IUser extends Document {
  passwordResetExpires?: number;
  passwordResetToken?: string;
  cursor: string;
  name: string;
  password?: string;
  picture?: string;
  cpf?: string;
  email: string;
  active: boolean;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
}

UserSchema.pre<IUser>('save', function encryptPasswordHook(next) {
  // Hash the password
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

UserSchema.index({ name: 'text' })

// this will make find, findOne typesafe
const UserModel = models.User || model('User', UserSchema) as Model<IUser>;;

export default UserModel;
