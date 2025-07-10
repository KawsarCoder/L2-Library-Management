import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
export const booksRoutes = express.Router()


booksRoutes.post("/",async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create book',
      error: (error as Error).message,
    });
  }
})

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

    const query: any = {};
    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books',
      error: (error as Error).message,
    });
  }
});

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
 try{
     const bookId = req.params.bookId;
  
    const book = await Book.findOne({_id: bookId})
    
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully", 
        book
    })
 }catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve book',
      error: (error as Error).message,
    });
  }
})

booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const updatedBody = req.body

    const book = await Book.findOneAndUpdate({_id: bookId}, updatedBody, {new: true})

    res.status(201).json({
        success: true,
        message: "Book updated successfully", 
        book
    })
  }catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update book',
      error: (error as Error).message,
    });
  }
})

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId
  const book = await Book.findByIdAndDelete(bookId)

  res.status(200).json({
    success: true,
    message: "Book Delete successfully", 
    data: null
  })
})