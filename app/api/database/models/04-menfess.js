"use strict";
const { Model } = require("sequelize");
const User = require("./01-user");
module.exports = (sequelize, DataTypes) => {
  class Menfess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menfess.init(
    {
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "phone_number",
        },
      },
      is_done: {
        type: DataTypes.BOOLEAN,
      },
      kode_negara: DataTypes.STRING,
      date_start: DataTypes.STRING,
      date_end: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menfess",
    }
  );
  return Menfess;
};
