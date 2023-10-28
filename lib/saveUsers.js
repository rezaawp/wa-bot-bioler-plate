const logging = require("./logging");
const { User } = require("../app/api/database/models");

module.exports = async ({ userId, name }) => {
  try {
    if (!userId.endsWith("@s.whatsapp.net")) return;

    const [user, userCreated] = await User.findOrCreate({
      where: { phone_number: userId },
      defaults: {
        name,
      },
    });

    if (userCreated) return;
    logging("primary", "New Users", userId.split("@")[0]);
  } catch (e) {
    if (!userId.endsWith("@s.whatsapp.net")) return;

    const [user, userCreated] = await User.findOrCreate({
      where: { phone_number: userId },
      defaults: {
        name: "anonim",
      },
    });

    if (userCreated) return;
    logging(
      "primary",
      "New Users With Erorr",
      userId.split("@")[0] + " || error = " + e
    );
  }
};
