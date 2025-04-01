/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("authors", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description").defaultTo("No description");
    table.string("birth_date");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("authors");
}
