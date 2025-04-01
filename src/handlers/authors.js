import { pool } from "../libs/pg";

export const getAuthors = async (_, reply) => {
  try {
    const res = await pool.query("SELECT * FROM authors");
    reply.status(200).send(res.rows);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const getAuthorByID = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid author ID" });
    }

    const res = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "author not found" });
    }

    reply.status(200).send(res.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const addAuthor = async (req, reply) => {
  try {
    const { name, description, birth_date } = req.body;

    await pool.query(
      "INSERT INTO authors (name, description, birth_date) VALUES ($1, $2, $3)",
      [name, description, birth_date]
    );

    reply.status(201).send({ message: "author added successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const deleteAuthor = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid author ID" });
    }

    const res = await pool.query("DELETE FROM authors WHERE id = $1", [id]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "author not found" });
    }

    reply.status(200).send({ message: "author deleted successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const editAuthor = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, birth_date } = req.body;

    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid author ID" });
    }

    if (!name && !description && !birth_date) {
      return reply
        .status(400)
        .send({ error: "at least one field must be provided" });
    }

    let query = "UPDATE authors SET ";
    let values = [];
    let index = 1;

    if (name) {
      query += `name = $${index}, `;
      values.push(name);
      index++;
    }
    if (description) {
      query += `description = $${index}, `;
      values.push(description);
      index++;
    }
    if (birth_date) {
      query += `birth_date = $${index}, `;
      values.push(birth_date);
      index++;
    }

    query = query.slice(0, -2); // Remove last comma
    query += ` WHERE id = $${index} RETURNING *`;
    values.push(id);

    const res = await pool.query(query, values);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "author not found" });
    }

    reply.status(201).send({ message: "author edited successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};
