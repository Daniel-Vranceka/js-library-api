/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("authors").del();
  await knex("authors").insert([
    {
      name: "J.K. Rowling",
      description: "British author, best known for the Harry Potter series.",
      birth_date: "1965-07-31",
    },
    {
      name: "George R.R. Martin",
      description:
        "American novelist and short story writer, author of A Song of Ice and Fire.",
      birth_date: "1948-09-20",
    },
    {
      name: "Agatha Christie",
      description:
        "English writer known for her detective novels, especially those featuring Hercule Poirot and Miss Marple.",
      birth_date: "1890-09-15",
    },
    {
      name: "Osamu Dazai",
      description:
        "A Japanese novelist and author, known for his popular works such as No Longer Human and The Setting Sun.",
      birth_date: "1909-06-13",
    },
  ]);
}
