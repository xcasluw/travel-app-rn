import { Router } from "express";

import QuestionsController from "./app/controllers/QuestionsController";

const routes = new Router();

routes.post("/questions-countries", QuestionsController.store);
routes.post("/questions-countries/:id", QuestionsController.question);
routes.get("/questions-countries", QuestionsController.index);
routes.get("/questions-countries/:id", QuestionsController.show);

export default routes;
