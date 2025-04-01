import {
  addAuthor,
  deleteAuthor,
  editAuthor,
  getAuthorByID,
  getAuthors,
} from "../handlers/authors";
import {
  addBookGenres,
  deleteBookGenres,
  editBookGenres,
  getBookGenres,
  getBookGenresByID,
} from "../handlers/book_genres";
import {
  addBook,
  deleteBook,
  editBook,
  getBookByID,
  getBooks,
  getBooksByGenre,
  getBooksByType,
} from "../handlers/books";
import {
  addGenre,
  deleteGenre,
  editGenre,
  getGenreByID,
  getGenres,
} from "../handlers/genres";
import {
  addType,
  deleteType,
  editType,
  getTypeByID,
  getTypes,
} from "../handlers/types";

export const routes = (fastify) => {
  // Authors
  fastify.get("/authors", getAuthors);
  fastify.get("/authors/:id", getAuthorByID);
  fastify.post("/authors", addAuthor);
  fastify.patch("/authors/:id", editAuthor);
  fastify.delete("/authors/:id", deleteAuthor);

  // Books
  fastify.get("/books", getBooks);
  fastify.get("/books/:id", getBookByID);
  fastify.get("/books/genre/:genre", getBooksByGenre);
  fastify.get("/books/type/:type", getBooksByType);
  fastify.post("/books", addBook);
  fastify.patch("/books/:id", editBook);
  fastify.delete("/books/:id", deleteBook);

  // Genres
  fastify.get("/genres", getGenres);
  fastify.get("/genres/:id", getGenreByID);
  fastify.post("/genres", addGenre);
  fastify.patch("/genres/:id", editGenre);
  fastify.delete("/genres/:id", deleteGenre);

  // Types
  fastify.get("/types", getTypes);
  fastify.get("/types/:id", getTypeByID);
  fastify.post("/types", addType);
  fastify.patch("/types/:id", editType);
  fastify.delete("/types/:id", deleteType);

  // Book-Genres
  fastify.get("/book-genres", getBookGenres);
  fastify.get("/book-genres/:book_id", getBookGenresByID);
  fastify.post("/book-genres", addBookGenres);
  fastify.patch("/book-genres/:book_id/:genre_id", editBookGenres);
  fastify.delete("/book-genres/:book_id/:genre_id", deleteBookGenres);
};
