import * as express from 'express';
import BooksController from '../controllers/Book';
import MemberControllers from '../controllers/Member';
import BorrowController from '../controllers/Borrow';

const Route = express.Router()

Route.get('/books', BooksController.getBooks)
Route.get('/members', MemberControllers.getMembers)

Route.post('/borrow/:memberCode/:bookCode', BorrowController.borrowCreate)
Route.post('/return/:memberCode/:bookCode', BorrowController.returnBook)

export default Route