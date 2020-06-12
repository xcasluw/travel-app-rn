import { Request, Response } from "express";
import knex from "../database/connection";

class QuestionsController {
  async index(request: Request, response: Response) {
    const questionsTable = await knex("questions").select("*");
    const options = await knex("options").select("*");

    const questions = questionsTable.map((question) => {
      const result = options.filter(
        (option) => option.id_question === question.id
      );
      return {
        ...question,
        options: result,
      };
    });

    return response.json(questions);
  }

  async create(request: Request, response: Response) {
    const { title } = request.body;

    const trx = await knex.transaction();

    const question = {
      image: request.file.filename,
      title,
    };

    const insertedIds = await trx("questions").insert(question);
    await trx.commit();

    return response.json({
      id: insertedIds,
      ...question,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const question = await knex("questions").where("id", id).first();
    if (!question) {
      return response.status(400).json({ message: "Question not found" });
    }

    const serializedQuestion = {
      ...question,
      image_url: `http://192.168.0.109:3333/uploads/${question.image}`,
    };

    const options = await knex("options").where("id_question", id).select("*");

    return response.json({ question: serializedQuestion, options });
  }
}

export default QuestionsController;
