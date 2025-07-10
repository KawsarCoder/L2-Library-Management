import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

export

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true },
    available: { type: Boolean, required: true },
  },
  { timestamps: true, 
    toJSON: {
      versionKey: false, 
      transform(doc, ret) {
        const {_id, ...rest} = ret;
        return { _id, ...rest };
      }
    } 
  }
);

export const Book = model<IBook>('Book', bookSchema);
