import { Request, Response, Router } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = Router();


borrowRoutes.post("/", async (req: Request, res: Response, next) => {
  try {
    const body = req.body;

    const data = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "Successfully borrowed the book",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

borrowRoutes.get("/", async (req: Request, res: Response, next) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            bookId: "$_id",
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
        },
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});