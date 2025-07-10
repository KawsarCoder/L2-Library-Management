import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

let server: Server;
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL ||
      process.env.LOCAL_DATABASE_URL ||
      'mongodb://localhost:27017/library-management-db');
    console.log('Database connected successfully');

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Database connection failed:', error);
  }
}

main();
