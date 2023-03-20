import mongoose from "mongoose"

// const MongoDb = process.env.MONGODB_URI

const MongoDb = "mongodb+srv://ronal2do:XtvgBwXoju0NRoWz@cluster0.h87xucp.mongodb.net/recicla?retryWrites=true&w=majority"

const mongooseOptions = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

const localUri = MongoDb as string;
const connection: any = {};
export async function connectDB() {
  if (connection.isConnected) {
    console.log('DB is already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(localUri, mongooseOptions);
  console.log('? MongoDB Database Connected Successfully');
  connection.isConnected = db.connections[0].readyState;
}

export async function disconnectDB() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not discounted');
    }
  }
}
