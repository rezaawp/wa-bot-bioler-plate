const CrudUserController = require("../../http/controllers/user/crud.controller");

module.exports = (app) => {
  app.get("/:id", CrudUserController.show);

  return app;
};
