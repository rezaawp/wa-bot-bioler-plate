const { RouteApi } = require("../helpers");

module.exports = (app) => {
  RouteApi("/user", require("./user/crud.user.route"), app);
  RouteApi("/fitur", require("./fitur/fitur.route"), app);
};
