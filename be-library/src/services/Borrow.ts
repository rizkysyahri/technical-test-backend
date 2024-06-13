import { Book, Borrow, Member } from "@prisma/client";
import prisma from "../lib/db/prisma";

class BorrowService {
  static async borrowCreate(memberCode: string, bookCode: string) {
    const member: Member[] = await prisma.$queryRaw`
        select * from "Member" where code = ${memberCode}
        `;

    const book: Book[] = await prisma.$queryRaw`
        select * from "Book" where code = ${bookCode}
    `;

    if (!member.length || !book.length) {
      throw new Error("Invalid member or book code");
    }

    const borrowedBooks: [] = await prisma.$queryRaw`
        select * from "Borrow" where "memberId" = ${member[0].id} and "returnedAt" is null 
    `;

    if (borrowedBooks.length >= 2) {
      throw new Error("Member tidak boleh meminjam buku lebih dari 2");
    }

    if (book[0].stock <= 0) {
      throw new Error("Buku tidak tersedia");
    }

    if (
      member[0].penaltyUntil &&
      new Date() < new Date(member[0].penaltyUntil)
    ) {
      throw new Error(
        "Member saat ini dihukum karena meminjam buku lebih dari 7 hari"
      );
    }

    await prisma.$executeRaw`
        insert into "Borrow" ("memberId", "bookId", "borrowedAt") values (${member[0].id}, ${book[0].id}, now())
    `;

    await prisma.$executeRaw`
        update "Book" set stock = stock - 1 where id = ${book[0].id}
    `;
  }

  static async returnBooks(memberCode: string, bookCode: string) {
    const member: Member[] = await prisma.$queryRaw`
    select * from "Member" where code = ${memberCode}
    `;

    const book: Book[] = await prisma.$queryRaw`
    select * from "Book" where code = ${bookCode}
    `;

    if (!member.length || !book.length) {
      throw new Error("Invalid member or book code");
    }

    const borrow: Borrow[] = await prisma.$queryRaw`
    select * from "Borrow" where "bookId" = ${book[0].id} and "memberId" = ${member[0].id} and "returnedAt" is null
    `;

    if (!borrow.length) {
      throw new Error("Buku ini tidak di pinjam oleh member");
    }

    const borrowDate = new Date(borrow[0].borrowedAt);
    const returnDateObj = new Date();
    const diffTime = Math.abs(returnDateObj.getTime() - borrowDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      await prisma.$executeRaw`
        update "Member" set "penaltyUntil" = now() + interval '3 days' where id = ${member[0].id}
        `;
    }

    await prisma.$executeRaw`
        update "Borrow" set "returnedAt" = CAST(${returnDateObj.toISOString()} as timestamp) where id = ${
      borrow[0].id
    }
    `;

    await prisma.$executeRaw`
        update "Book" set stock = stock + 1 where id = ${book[0].id}
    `;
  }
}

export default BorrowService;
