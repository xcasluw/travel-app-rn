import { Request, Response } from "express";
import knex from "../database/connection";

class OptionsController {
  async create(request: Request, response: Response) {
    const { id_question, value, description } = request.body;

    const trx = await knex.transaction();

    const option = {
      id_question,
      value,
      description,
    };

    const insertedIds = await trx("options").insert(option);
    await trx.commit();

    return response.json({
      id: insertedIds,
      ...option,
    });
  }
}

export default OptionsController;
