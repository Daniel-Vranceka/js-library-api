import { pool } from "../libs/pg";

export const getGenres = async (_, reply) => {
  try {
    const res = await pool.query("SELECT * FROM genres");
    reply.status(200).send(res.rows);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const getGenreByID = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid genre ID" });
    }

    const res = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "genre not found" });
    }

    reply.status(200).send(res.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const addGenre = async (req, reply) => {
  try {
    const { name } = req.body;

    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);

    reply.status(201).send({ message: "genre added successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const deleteGenre = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid genre ID" });
    }

    const res = await pool.query("DELETE FROM genres WHERE id = $1", [id]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "genre not found" });
    }

    reply.status(200).send({ message: "genre deleted successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};

export const editGenre = async (req, reply) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (isNaN(id)) {
      return reply.status(400).send({ error: "invalid genre ID" });
    }

    if (!name) {
      return reply
        .status(400)
        .send({ error: "at least one field must be provided" });
    }

    const res = await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);

    if (res.rowCount < 1) {
      return reply.status(404).send({ error: "genre not found" });
    }

    reply.status(201).send({ message: "genre edited successfully" });
  } catch (err) {
    reply.status(500).send({ error: "internal server error" });
    console.log(err);
  }
};
