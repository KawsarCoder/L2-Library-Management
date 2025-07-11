import { Request, Response, Router } from "express";
import { borrow } from "../models/borrow.model";

export const borrowRoutes = Router();


borrowRoutes.post("/", async (req: Request, res: Response, next) => {
  try {
    const body = req.body;

    const data = await borrow.create(body);
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
    const data = await borrow.aggregate([
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
      message: "Summary of borrowed books fetched successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});