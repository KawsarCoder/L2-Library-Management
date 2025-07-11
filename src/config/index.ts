import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL || 'mongodb://localhost:27017/library-management-db',
};