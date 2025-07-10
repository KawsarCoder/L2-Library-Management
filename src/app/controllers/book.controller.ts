import { Request, Response, NextFunction } from 'express';
import Book from '../models/book.model';

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (err) {
    next(err); 
  }
};
