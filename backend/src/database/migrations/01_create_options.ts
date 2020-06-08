import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("options", (table) => {
    table.increments("id").primary();
    table.integer("id_question").notNullable();
    table.string("value").notNullable();
    table.string("description").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("options");
}
