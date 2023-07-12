// const crud = require("./lib/json/crud");

// const db = new crud("database/db.json");
// db.create({
//   id: 3,
//   data: {
//     nama: "Wijaya Putra",
//     kelas: 10,
//   },
// });

// // const cari = db.find("3");
// // // console.log(cari.data);
// // // console.log(cari.update({ nama: "Haikal Updated", kelas: 10 }, false));
// // console.log(cari.delete());

let animals = {
  a: "dog",
  b: "cat",
  c: "bird",
};

let lastKey = Object.keys(animals).pop();
let lastValue = animals[Object.keys(animals).pop()];

console.log(lastKey);
