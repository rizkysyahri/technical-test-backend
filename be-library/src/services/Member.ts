import { Member } from "@prisma/client";
import prisma from "../lib/db/prisma";

class MembersService {
  static async getMembers() {
    const members: Member[] = await prisma.$queryRaw`
      SELECT 
        m.*,
        CASE 
          WHEN COUNT(b.id) = 0 THEN '[]' :: json
          ELSE
            json_agg(json_build_object(
              'id', b.id,
              'borrowAt', b."borrowedAt",
              'returnedAt', b."returnedAt",
              'memberId', b."memberId",
              'bookId', b."bookId"
            )) FILTER (WHERE b."returnedAt" IS NULL)
        END AS "borrowRecord",
        CASE 
          WHEN m."penaltyUntil" IS NULL THEN false
          ELSE true
        END AS "isPenalized"
      FROM 
        "Member" m
      LEFT JOIN 
        "Borrow" b 
      ON 
        m.id = b."memberId"
      GROUP BY 
        m.id 
      ORDER BY
      m.id asc
    `;

    return members;
  }
}

export default MembersService;
