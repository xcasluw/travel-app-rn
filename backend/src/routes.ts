import express, { request } from "express";
import { celebrate, Joi } from "celebrate";

import multer from "multer";
import multerConfig from "./config/multer";

import QuestionsController from "../src/controllers/QuestionsController";

const questionsController = new QuestionsController();

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/questions", questionsController.index);
routes.get("/questions/:id", questionsController.show);
routes.post(
  "/questions",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        title: Joi.string().required(),
        question_1: Joi.string().required(),
        question_2: Joi.string().required(),
        question_3: Joi.string().required(),
        question_4: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  questionsController.create
);

export default routes;
