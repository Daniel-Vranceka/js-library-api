import { pool } from "../libs/pg";

export const getBookGenres = async (_, reply) => {
  try {
    const res = await pool.query("SELECT * FROM book_genres");
    reply.status(200).send(res.rows);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const getBookGenresByID = async (req, reply) => {
  try {
    const id = parseInt(req.params.book_id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid book ID" });
    }

    const res = await pool.query(
      "SELECT * FROM book_genres WHERE book_id = $1",
      [id]
    );

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "book's genres not found" });
    }

    reply.status(200).send(res.rows);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const addBookGenres = async (req, reply) => {
  try {
    const { book_id, genre_id } = req.body;

    await pool.query(
      "INSERT INTO book_genres (book_id, genre_id) VALUES ($1, $2)",
      [parseInt(book_id), parseInt(genre_id)]
    );

    reply.status(201).send({ message: "book's genre added successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const deleteBookGenres = async (req, reply) => {
  try {
    const { book_id, genre_id } = req.params;

    if (!book_id || !genre_id) {
      return reply
        .status(400)
        .send({ error: "book_id and genre_id must have values" });
    }

    const res = await pool.query(
      "DELETE FROM book_genres WHERE book_id = $1 AND genre_id = $2",
      [parseInt(book_id), parseInt(genre_id)]
    );

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "relations not found" });
    }

    reply.status(200).send({ message: "book's genre deleted successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const editBookGenres = async (req, reply) => {
  try {
    const book_id_param = parseInt(req.params.book_id);
    const genre_id_param = parseInt(req.params.genre_id);
    const { book_id, genre_id } = req.body;

    if (isNaN(book_id_param) || isNaN(genre_id_param)) {
      return reply.status(400).send({ error: "invalid book ID or genre ID" });
    }

    if (!book_id && !genre_id) {
      return reply
        .status(400)
        .send({ error: "at least one field must be provided" });
    }

    let query = "UPDATE book_genres SET ";
    let values = [];
    let index = 1;

    if (book_id) {
      query += `book_id = $${index}, `;
      values.push(book_id);
      index++;
    }
    if (genre_id) {
      query += `genre_id = $${index}, `;
      values.push(genre_id);
      index++;
    }

    query = query.slice(0, -2); // Remove last comma
    query += ` WHERE book_id = $${index} AND genre_id = $${
      index + 1
    } RETURNING *`;
    values.push(book_id_param, genre_id_param);

    const res = await pool.query(query, values);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "relation not found" });
    }

    reply.status(201).send({ message: "book's genre edited successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};
