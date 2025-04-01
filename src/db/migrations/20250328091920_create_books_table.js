/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").defaultTo("No description provided.");
    table.integer("pages");
    table.string("publish_date").nullable();
    table
      .integer("type_id")
      .unsigned()
      .references("id")
      .inTable("book_types")
      .onDelete("CASCADE");
    table
      .integer("author_id")
      .unsigned()
      .references("id")
      .inTable("authors")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("books");
}
