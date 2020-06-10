import express, { request } from "express";
import { celebrate, Joi } from "celebrate";

import multer from "multer";
import multerConfig from "./config/multer";

import QuestionsController from "../src/controllers/QuestionsController";
import OptionsController from "../src/controllers/OptionsController";
import PlacesController from "../src/controllers/PlacesController";

const questionsController = new QuestionsController();
const optionsController = new OptionsController();
const placesController = new PlacesController();

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
      }),
    },
    {
      abortEarly: false,
    }
  ),
  questionsController.create
);
routes.post(
  "/options",
  celebrate(
    {
      body: Joi.object().keys({
        id_question: Joi.number().required(),
        value: Joi.string().required(),
        description: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  optionsController.create
);
routes.get("/places", placesController.index);
routes.get("/places/:id", placesController.show);
routes.post(
  "/places",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        times: Joi.number().required(),
        region: Joi.string().required(),
        weather: Joi.string().required(),
        country: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  placesController.create
);

export default routes;
