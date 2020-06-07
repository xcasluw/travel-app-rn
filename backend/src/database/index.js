import Sequelize from "sequelize";
import QuestionsCountries from "../app/models/QuestionsCountries";
import databaseConfig from "../config/database";

const models = [QuestionsCountries];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
