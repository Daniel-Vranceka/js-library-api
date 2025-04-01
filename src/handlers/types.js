import { pool } from "../libs/pg";

export const getTypes = async (_, reply) => {
  try {
    const res = await pool.query("SELECT * FROM book_types");
    reply.status(200).send(res.rows);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const getTypeByID = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid type ID" });
    }

    const res = await pool.query("SELECT * FROM book_types WHERE id = $1", [
      id,
    ]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "type not found" });
    }

    reply.status(200).send(res.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const addType = async (req, reply) => {
  try {
    const { name } = req.body;

    await pool.query("INSERT INTO book_types (name) VALUES ($1)", [name]);

    reply.status(201).send({ message: "type added successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const deleteType = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid type ID" });
    }

    const res = await pool.query("DELETE FROM book_types WHERE id = $1", [id]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "type not found" });
    }

    reply.status(200).send({ message: "type deleted successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const editType = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid type ID" });
    }

    if (!name) {
      return reply
        .status(400)
        .send({ error: "at least one field must be provided" });
    }

    const res = await pool.query("UPDATE types SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "type not found" });
    }

    reply.status(201).send({ message: "type edited successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};
