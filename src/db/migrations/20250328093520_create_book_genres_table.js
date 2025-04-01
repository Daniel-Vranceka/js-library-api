/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("book_genres", (table) => {
    table
      .integer("book_id")
      .unsigned()
      .references("id")
      .inTable("books")
      .onDelete("CASCADE");
    table
      .integer("genre_id")
      .unsigned()
      .references("id")
      .inTable("genres")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("book_genres");
}
