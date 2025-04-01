/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("book_types").del();
  await knex("book_types").insert([
    { name: "Novel" },
    { name: "Comic" },
    { name: "Novella" },
    { name: "Light Novel" },
    { name: "Manga" },
  ]);
}
