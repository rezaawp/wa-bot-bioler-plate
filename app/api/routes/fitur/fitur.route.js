const fiturController = require("../../http/controllers/fitur.controller");

module.exports = (app) => {
  app.put("/", fiturController.update);

  return app;
};
