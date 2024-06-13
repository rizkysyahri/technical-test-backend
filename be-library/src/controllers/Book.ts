import { Request, Response } from "express";
import BooksService from "../services/Book";

class BooksController {
  /**
   * @swagger
   * /api/v1/books:
   *   get:
   *     summary: Get all books
   *     responses:
   *       200:
   *         description: A list of books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     example: 1
   *                   code:
   *                     type: string
   *                     example: "JK-45"
   *                   title:
   *                     type: string
   *                     example: "Harry Potter"
   *                   author:
   *                     type: string
   *                     example: "J.K Rowling"
   *                   stock:
   *                     type: integer
   *                     example: 1
   *
   */

  static async getBooks(req: Request, res: Response) {
    try {
      const books = await BooksService.getBooks();

      res.status(200).json({ data: books });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({ message: err.message });
    }
  }
}

export default BooksController;
