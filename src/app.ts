import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controller";
import { errorhandler } from "./app/middlewares/errorHandler";
import { notFoundHandler } from "./app/middlewares/notFoundHandler";

const app: Application = express();
app.use(express.json());

// app.use("/api/books", booksRoutes);

app.use("/books", booksRoutes);
app.use("/borow", booksRoutes);

app.use(errorhandler);
app.use(notFoundHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management app!");
});

export default app;