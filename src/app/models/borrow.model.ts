import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";
// import { Book } from "./book.model";


const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Enter a valid positive integer for quantity"],
      validate: {
        validator: Number.isInteger,
        message: "Enter a valid positive integer for quantity",
      },
    },
    dueDate: {
      type: Date,
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

borrowSchema.pre("save", async function (next) {
    try {
      const borrow = this as IBorrow;
      await Book.updateCopies(borrow.book.toString(), borrow.quantity);
      next();
    } catch (error) {
      next(error as Error);
    }
  });


export const Borrow = model<IBorrow>("Borrow", borrowSchema);