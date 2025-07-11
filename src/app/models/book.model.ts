import { Schema, model } from 'mongoose';
import { BookModel, IBook } from '../interfaces/book.interface';
import { borrow } from "./borrow.model";
import validator from "validator";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"], 
      trim: true 
    },
    author: { 
      type: String, 
      required: [true, "Author is required"], 
      trim: true 
    },
    genre: { 
      type: String, 
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], 
      required: [true, "Genre is Required"], 
      message: "Invalid genre specified" 
    },
    isbn: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
        validator: (value: string) => validator.isISBN(value),
        message: `ISBN format is incorrect`,
      }, 
    },
    description: { 
      type: String, 
      trim: true, 
    },
    copies: { 
      type: Number, 
      required: true, 
      min: [0, "Enter a number greater than 0 for copies"],
      validate: {
        validator: Number.isInteger,
        message: "Enter a number greater than 0 for copies",
      },
    },
    available: { 
      type: Boolean, 
      required: true, 
    },
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

bookSchema.statics.updateCopies = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error("Book is not found");
  }
  if (book.copies < quantity) {
    throw new Error(`Insufficient copies in stock! Copies : ${book.copies}`);
  }
  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }
  await book.save();
};

bookSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await borrow.deleteMany({ book: doc._id });
  }
});

export const Book = model<IBook, BookModel>('Book', bookSchema);
