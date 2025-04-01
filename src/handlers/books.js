import { pool } from "../libs/pg";

export const getBooks = async (_, reply) => {
  try {
    const res = await pool.query("SELECT * FROM books");
    reply.status(200).send(res.rows);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const getBookByID = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid book ID" });
    }

    const res = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "book not found" });
    }

    reply.status(200).send(res.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const getBooksByGenre = async (req, reply) => {
  try {
    const genre = req.params.genre;

    if (!genre) {
      return reply.status(400).send({ error: "genre is required" });
    }

    const genreCheck = await pool.query(
      "SELECT id FROM genres WHERE name = $1",
      [genre]
    );

    if (genreCheck.rowCount < 1) {
      return reply.status(404).send({ error: "genre not found" });
    }

    const res = await pool.query(
      "SELECT b.id, b.title, b.description, b.pages, b.publish_date, b.type_id, b.created_at, b.updated_at FROM books b INNER JOIN book_genres bg ON b.id = bg.book_id INNER JOIN genres g ON bg.genre_id = g.id WHERE g.name = $1",
      [genre]
    );

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "books not found" });
    }

    reply.status(200).send(res.rows);
  } catch (err) {
    console.error("Database error:", err);
    reply.status(500).send({ error: "Internal server error" });
  }
};

export const getBooksByType = async (req, reply) => {
  try {
    const type = req.params.type;

    if (!type) {
      return reply.status(400).send({ error: "type is required" });
    }

    const typeCheck = await pool.query(
      "SELECT id FROM book_types WHERE name = $1",
      [type]
    );

    if (typeCheck.rowCount < 1) {
      return reply.status(404).send({ error: "type not found" });
    }

    const res = await pool.query(
      "SELECT b.id, b.title, b.description, b.pages, b.publish_date, b.type_id, b.created_at, b.updated_at FROM books b INNER JOIN book_types bt ON b.type_id = bt.id WHERE bt.name = $1",
      [type]
    );

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "books not found" });
    }

    reply.status(200).send(res.rows);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const addBook = async (req, reply) => {
  try {
    const { title, description, pages, publish_date, type_id, author_id } =
      req.body;

    await pool.query(
      "INSERT INTO books (title, description, pages, publish_date, type_id, author_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, description, pages, publish_date, type_id, author_id]
    );

    reply.status(201).send({ message: "book added successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const deleteBook = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid book ID" });
    }

    const res = await pool.query("DELETE FROM books WHERE id = $1", [id]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "book not found" });
    }

    reply.status(200).send({ message: "book deleted successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const editBook = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, pages, publish_date, type_id, author_id } =
      req.body;

    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid author ID" });
    }

    if (
      (!title && !description && !pages && !publish_date, type_id, author_id)
    ) {
      return reply
        .status(400)
        .send({ error: "at least one field must be provided" });
    }

    let query = "UPDATE books SET ";
    let values = [];
    let index = 1;

    if (title) {
      query += `title = $${index}, `;
      values.push(title);
      index++;
    }
    if (description) {
      query += `description = $${index}, `;
      values.push(description);
      index++;
    }
    if (pages) {
      query += `pages = $${index}, `;
      values.push(pages);
      index++;
    }
    if (publish_date) {
      query += `publish_date = $${index}, `;
      values.push(publish_date);
      index++;
    }
    if (type_id) {
      query += `type_id = $${index}, `;
      values.push(type_id);
      index++;
    }
    if (author_id) {
      query += `author_id = $${index}, `;
      values.push(author_id);
      index++;
    }

    query = query.slice(0, -2); // Remove last comma
    query += ` WHERE id = $${index} RETURNING *`;
    values.push(id);

    const res = await pool.query(query, values);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "book not found" });
    }

    reply.status(201).send({ message: "book edited successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};
