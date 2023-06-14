const { default: axios } = require("axios");

module.exports = (rkwpbot) => {
  const CronJob = require("cron").CronJob;

  // Menjadwalkan cron job untuk menjalankan pada setiap hari Senin dan Jumat pada jam 8 pagi (pukul 8:00)
  //   const cronExpression = "0 8 * * 1,5"; // pada setiap hari senin dan jumat
  const cronExpression = "50 22 * * *";
  const timeZone = "Asia/Jakarta";

  const job = new CronJob(
    cronExpression,
    async () => {
      const res = await axios({
        method: "get",
        url: "https://mfarels.my.id/api/openai?text=saya%20cape,%20saya%20ingin%20bunuh%20diri,%20tolong%20berikan%20saya%20semangat%20hidup",
      });
      rkwpbot.ev.emit("uangkas", {
        message: res.data.result,
        to: "628892732501",
      });
    },
    null,
    true,
    timeZone
  );

  job.start();
};
