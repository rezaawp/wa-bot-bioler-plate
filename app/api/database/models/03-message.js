"use strict";
const { Model } = require("sequelize");
const User = require("./01-user");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      message: DataTypes.JSON,
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "phone_number",
        },
      },
    fitur_id: {
        type: DataTypes.STRING,
        references: {
          model: "Fiturs",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
