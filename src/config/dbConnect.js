import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://pawar:sachinpawar@cluster0.m1wug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverApi: ServerApiVersion.v1,
      tls: true,
      tlsCertificateKeyFile: process.env.MONGO_CERT_PATH,
    });

    isConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;
