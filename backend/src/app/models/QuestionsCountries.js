import Sequelize, { Model } from "sequelize";

class QuestionsCountries extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        alternative_1: Sequelize.STRING,
        alternative_2: Sequelize.STRING,
        alternative_3: Sequelize.STRING,
        alternative_4: Sequelize.STRING,
        answer: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "tb_questions_countries"
      }
    );
    return this;
  }
}

export default QuestionsCountries;
