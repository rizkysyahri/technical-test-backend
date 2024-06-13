import { Book } from "@prisma/client";
import prisma from "../lib/db/prisma";

class BooksService {
  static async getBooks() {
    const books: Book[] = await prisma.$queryRaw`
      select * from "Book" where stock > 0 ORDER BY id asc
      `;

    return books;
  }
}

export default BooksService;
