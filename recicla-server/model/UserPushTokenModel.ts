import { Document, model, models, Model, Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

export const USER_PUSHENDPOINT_TYPE = {
  IOS: 'IOS',
  ANDROID: 'ANDROID',
  WEB: 'WEB',
};

const UserPushTokenSchema: Schema = new Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: 'User',
      index: true,
      description: 'User that owns this device',
    },
    type: {
      type: String,
      enum: Object.values(USER_PUSHENDPOINT_TYPE),
      required: true,
      description: 'Type of the device',
    },
    token: {
      type: String,
      required: true,
      index: true,
      description: 'Device token',
    },
    active: {
      type: Boolean,
      default: true,
      description: 'If this token is active or not',
      required: true,
    },
    deleted: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'userPushToken',
  },
);

export interface IUserPushToken extends Document {
  user?: string;
  type?: string;
  token?: string;
  active: boolean;
  deleted: boolean;
}

// this will make find, findOne typesafe
const UserPushTokenModel = models.UserPushToken || model('UserPushToken', UserPushTokenSchema) as Model<IUserPushToken>;

export default UserPushTokenModel;
