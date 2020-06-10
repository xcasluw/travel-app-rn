import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("places", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.integer("times").notNullable();
    table.string("region").notNullable();
    table.string("weather").notNullable();
    table.string("country").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("places");
}
