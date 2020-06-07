import QuestionsCountries from "../models/QuestionsCountries";
import * as Yup from "yup";
import { Op } from "sequelize";

class QuestionsController {
  async index(req, res) {
    const questions = await QuestionsCountries.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(questions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      alternative_1: Yup.string().required(),
      alternative_2: Yup.string().required(),
      alternative_3: Yup.string().required(),
      alternative_4: Yup.string().required(),
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Os dados são inválidos" });
    }

    const question = await QuestionsCountries.create(req.body);
    return res.json(question);
  }

  async show(req, res) {
    const question = await QuestionsCountries.findByPk(req.params.id);
    if (!question) {
      return res.status(400).json({ error: "A questão não existe" });
    }
    return res.json(question);
  }

  async question(req, res) {
    const mb = await QuestionsCountries.findOne({
      where: {
        [Op.and]: [{ id: req.params.id }, { answer: req.body.answer }],
      },
    });

    if (!mb) {
      return res.status(400).json({ error: "Resposta incorreta" });
    }
    return res.json(mb);
  }
}

export default new QuestionsController();
