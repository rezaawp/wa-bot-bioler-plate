const dataModelToObjectHelper = require("../../../../lib/dataModelToObject.helper");
const { Fitur } = require("../../database/models");
const { LogError, response } = require("./../../helpers");
const { Op } = require("sequelize");

class FiturController {
  async store(req, res) {
    try {
    } catch (e) {
      return LogError(__dirname + __filename, e);
    }
  }

  async show(req, res) {
    try {
    } catch (e) {
      return LogError(__dirname + __filename, e);
    }
  }

  async update(req, res) {
    try {
      const { data } = req.body;
      const fiturs = data.map((d) => d.fitur);
      const findFitur = await Fitur.findAll({
        where: {
          name: {
            [Op.or]: fiturs,
          },
        },
      });

      //   if (fiturs.length !== findFitur.length) {
      //   }

      const dataObj = dataModelToObjectHelper(findFitur).get();

      await findFitur[0].update({
        is_aktif: false,
      });

      return res.send(dataObj);
    } catch (e) {
      return LogError(__dirname + __filename, e);
    }
  }
}

module.exports = new FiturController();
