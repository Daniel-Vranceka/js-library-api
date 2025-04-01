/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("genres").del();
  await knex("genres").insert([
    { name: "fantasy" },
    { name: "adventure" },
    { name: "mystery" },
    { name: "romance" },
    { name: "sci-fi" },
    { name: "thriller" },
    { name: "psychological" },
  ]);
}
