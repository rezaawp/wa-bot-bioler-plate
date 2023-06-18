class Config {
  deleteDataFiturs = true;
  authorNumber = "6285714149247";
  authorName = "RKWP";
  menuMessage = `*${this.authorName}* | Menu\n\n🪧 *_Groups Chat_*\n▪️.menu = Menampilkan Semua Fitur\n▪️.info = Informasi Group\n▪️.pushContact [pesan]|[delay] = Push Contact (Kirim Pesan Ke Semua Member Group)\n▪️.pushContact [pesan]|[delay] = Push Contact (Kirim Pesan Ke Semua Member Group Dengan Gambar)\n▪️.clone [nama group] = Duplikat Group Beserta Membernya\n▪️.saveUser = Save Semua Nomor Member Group Ke Database Users\n▪️.saveContact = Save Semua Nomor Member Group Ke Database Contacts\n▪️.dropUser = Hapus Semua Data Users Di Database Users\n▪️.dropContact = Hapus Semua Data Contacts Di Database Contacts\n▪️.sticker = Membuat Sticker Di Group (Dengan Gambar)\n\n🪧 *_Private Chat_*\n▪️.menu = Menampilkan Semua Fitur\n▪️️.pushContact [pesan]|[delay] = Push Contact (Kirim Pesan Ke Semua Orang Yang Ada Di Database Users)\n▪️.pushContact [pesan]|[delay] = Push Contact (Kirim Pesan Ke Semua Orang Yang Ada Di Database Users Dengan Gambar)\n▪️.save [nama] = Auto Generate Contact\n▪️.exportContact = Export Contact & Generate File vcf\n▪️.dropUser = Hapus Semua Data Users Di Database Users\n▪️.dropContact = Hapus Semua Data Contacts Di Database Contacts\n▪️.sticker = Membuat Sticker (Dengan Gambar)\n\n*Tutorial :* https://www.youtube.com/@bayumahadika\n*Telegram Group :* https://t.me/ReybotVIP\n*Whatsapp Group :* https://chat.whatsapp.com/GYZ133XTxthBW9tu8m9EKM`;
  caption = "rezawp.com";
  disableFiturs = ["tt", "yt", "meme", "darkjokes", "bacotan"];
  prosesIcon = "🔄";
  warningIcon = "⚠️";
  successIcon = "✅";
  failIcon = "❌";
  whatsapp = "@s.whatsapp.net";
  menfess = {
    id: {
      ifMenfess:
        "anda sedang menggunakan fitur menfess. silahkan ketik .stop untuk menggunakan fitur lain",
    },
  };
  chrome = {
    production: {
      headless: false,
      args: ["--no-sandbox", "--headless"],
    },
    development: { headless: false, args: ["--no-sandbox"] },
  };
}

module.exports = new Config();
