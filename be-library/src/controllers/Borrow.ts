import { Request, Response } from "express";
import BorrowService from "../services/Borrow";

class BorrowController {
  /**
   * @swagger
   * /api/v1/borrow/{memberCode}/{bookCode}:
   *   post:
   *     summary: Borrow a book
   *     parameters:
   *       - in: path
   *         name: memberCode
   *         required: true
   *         schema:
   *           type: string
   *         description: Code of the member
   *       - in: path
   *         name: bookCode
   *         required: true
   *         schema:
   *           type: string
   *         description: Code of the book
   *     responses:
   *       201:
   *         description: Buku dipinjam
   *       400:
   *         description: Invalid member or book code
   *       500:
   *         description: Invalid member or book code / Other error
   */

  static async borrowCreate(req: Request, res: Response) {
    try {
      const { memberCode, bookCode } = req.params;

      await BorrowService.borrowCreate(memberCode, bookCode);

      res.status(201).json({ message: "Buku dipinjam" });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({ message: err.message });
    }
  }

  /**
   * @swagger
   * /api/v1/return/{memberCode}/{bookCode}:
   *   post:
   *     summary: Return a book
   *     parameters:
   *       - in: path
   *         name: memberCode
   *         required: true
   *         schema:
   *           type: string
   *         description: Code of the member
   *       - in: path
   *         name: bookCode
   *         required: true
   *         schema:
   *           type: string
   *         description: Code of the book
   *     responses:
   *       201:
   *         description: Buku dikembalikan
   *       400:
   *         description: Invalid member or book code
   *       500:
   *         description: Invalid member or book code / Other error
   */

  static async returnBook(req: Request, res: Response) {
    try {
      const { memberCode, bookCode } = req.params;

      await BorrowService.returnBooks(memberCode, bookCode);

      res.status(201).json({ message: "Buku telah dikembalikan" });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({ message: err.message });
    }
  }
}
export default BorrowController;
