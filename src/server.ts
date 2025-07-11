import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
import config from './config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL);
    console.log('Database connected successfully');

    server = app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log('Database connection failed:', error);
  }
}

main();
