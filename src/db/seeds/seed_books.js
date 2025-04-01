/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("books").del();
  await knex("books").insert([
    {
      title: "Harry Potter and the Sorcerer's Stone",
      description:
        "The first book in the Harry Potter series, following Harry's discovery of the wizarding world.",
      pages: 309,
      publish_date: "1997-06-26",
      author_id: 1,
      type_id: 1,
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      description:
        "Harry returns for his second year at Hogwarts and discovers the secrets of the Chamber of Secrets.",
      pages: 341,
      publish_date: "1998-07-02",
      author_id: 1,
      type_id: 1,
    },
    {
      title: "A Game of Thrones",
      description:
        "The first book in A Song of Ice and Fire, introducing the battle for the Iron Throne.",
      pages: 694,
      publish_date: "1996-08-06",
      author_id: 2,
      type_id: 1,
    },
    {
      title: "Murder on the Orient Express",
      description:
        "Hercule Poirot investigates a murder aboard the luxurious Orient Express train.",
      pages: 256,
      publish_date: "1934-01-01",
      author_id: 3,
      type_id: 1,
    },
    {
      title: "And Then There Were None",
      description:
        "Ten strangers are invited to a remote island and are mysteriously killed one by one.",
      pages: 272,
      publish_date: "1939-11-06",
      author_id: 3,
      type_id: 1,
    },
    {
      title: "No Longer Human",
      description:
        "A semi-autobiographical novel exploring themes of alienation and depression.",
      pages: 271,
      publish_date: "1948-07-25",
      author_id: 4,
      type_id: 1,
    },
    {
      title: "The Setting Sun",
      description:
        "A novel depicting post-war Japan through the perspective of a declining aristocratic family.",
      pages: 212,
      publish_date: "1947-01-01",
      author_id: 4,
      type_id: 1,
    },
  ]);
}
