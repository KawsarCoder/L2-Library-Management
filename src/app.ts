import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controller";
import { errorhandler } from "./app/middlewares/errorHandler";
import { notFoundHandler } from "./app/middlewares/notFoundHandler";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import cors from "cors";


const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      `https://library-management-server-taupe.vercel.app/`,
      "http://localhost:5173",
    ],
  })
);

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.use(errorhandler);
app.use(notFoundHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management app!");
});

export default app;