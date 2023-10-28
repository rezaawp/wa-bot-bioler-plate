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

// let animals = {
//   a: "dog",
//   b: "cat",
//   c: "bird",
// };

// let lastKey = Object.keys(animals).pop();
// let lastValue = animals[Object.keys(animals).pop()];

// console.log(lastKey);

function changeTimezone(date, ianatz) {
  // suppose the date is 12:00 UTC
  var invdate = new Date(
    date.toLocaleString("en-US", {
      timeZone: ianatz,
    })
  );

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract
}

// E.g.
var here = new Date();
var there = changeTimezone(here, "Asia/Jakarta");

console.log(`Here: ${here.toString()}\nToronto: ${there.toString()}`);
