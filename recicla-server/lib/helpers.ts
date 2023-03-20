import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { IUser } from "../model/UserModel";

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
};

export async function connectMongoose() {
  return mongoose.connect(
    global.__MONGO_URI__,
    {
      ...mongooseOptions,
      dbName: global.__MONGO_DB_NAME__,
    },
  );
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

// export async function disconnectMongoose() {
//   await mongoose.disconnect();
//   mongoose.connection.forEach((connection: { models: { [x: string]: any; }; collections: { [x: string]: any; }; }) => {
//     const modelNames = Object.keys(connection.models);

//     modelNames.forEach((modelName) => {
//       delete connection.models[modelName];
//     });

//     const collectionNames = Object.keys(connection.collections);
//     collectionNames.forEach((collectionName) => {
//       delete connection.collections[collectionName];
//     });
//   });

//   const modelSchemaNames = Object.keys(mongoose.modelSchemas);
//   modelSchemaNames.forEach((modelSchemaName) => {
//     delete mongoose.modelSchemas[modelSchemaName];
//   });
// }

export const jwtSecret =
  process.env.JWT_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6dwadatwti788DuiODUxMyIsImlhdCI6MTUwMzY5MTE0Mn0.s9kO0HoPZpskzNsstF7Eer504DUC5r1MY6qjSFu_8eM'

export function generateToken(user: IUser) {
  return `JWT ${jwt.sign({ id: user._id }, jwtSecret)}`;
}

export const isValidEmail = (emailAddress: string) => {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
};
