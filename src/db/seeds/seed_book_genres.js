/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("book_genres").del();
  await knex("book_genres").insert([
    { book_id: 1, genre_id: 1 },
    { book_id: 1, genre_id: 2 },
    { book_id: 2, genre_id: 1 },
    { book_id: 2, genre_id: 2 },
    { book_id: 3, genre_id: 1 },
    { book_id: 4, genre_id: 3 },
    { book_id: 5, genre_id: 3 },
    { book_id: 6, genre_id: 7 },
    { book_id: 7, genre_id: 7 },
  ]);
}
