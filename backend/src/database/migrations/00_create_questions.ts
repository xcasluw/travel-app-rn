import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("questions", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("title").notNullable();
    table.string("question_1").notNullable();
    table.string("question_2").notNullable();
    table.string("question_3").notNullable();
    table.string("question_4").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("questions");
}
