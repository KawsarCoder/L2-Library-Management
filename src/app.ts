import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './app/routes/book.route';
import errorHandler from './app/middlewares/errorHandler';

const app = express();
app.use(express.json());

// Connect MongoDB here...

app.use('/api', bookRoutes);

app.use(errorHandler);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
