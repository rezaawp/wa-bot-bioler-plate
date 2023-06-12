const { RouteApi } = require("../helpers");

module.exports = (app) => {
  RouteApi("/user", require("./user/crud.user.route"), app);
};
