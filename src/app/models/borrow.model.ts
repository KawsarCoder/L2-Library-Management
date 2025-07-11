import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";


const schemaBorrow = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be Positive integer"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be Positive integer",
      },
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schemaBorrow.pre("save", async function (next) {
  try {
    const borrow = this as IBorrow;

    await Book.updateCopies(borrow.book.toString(), borrow.quantity);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const borrow = model<IBorrow>("borrows", schemaBorrow);