import { Request, Response } from "express";
import MembersService from "../services/Member";

class MemberControllers {
  /**
   * @swagger
   * /api/v1/members:
   *   get:
   *     summary: Get all members with their borrow records
   *     responses:
   *       200:
   *         description: A list of members with borrow records
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
   *                     example: "M001"
   *                   name:
   *                     type: string
   *                     example: "Angga"
   *                   penaltyUntil:
   *                     type: string
   *                     format: date-time
   *                     example: null
   *                   borrowRecord:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: integer
   *                           example: 2
   *                         borrowAt:
   *                           type: string
   *                           format: date-time
   *                           example: "2024-06-12T20:05:52.31"
   *                         returnedAt:
   *                           type: string
   *                           format: date-time
   *                           example: null
   *                         memberId:
   *                           type: integer
   *                           example: 1
   *                         bookId:
   *                           type: integer
   *                           example: 2
   */

  static async getMembers(req: Request, res: Response) {
    try {
      const members = await MembersService.getMembers();

      res.status(200).json({ data: members });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({ message: err.message });
    }
  }
}

export default MemberControllers;
