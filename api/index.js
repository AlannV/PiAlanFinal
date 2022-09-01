//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  allTemperaments,
  filterDuplicates,
} = require("../api/src/Controllers/temperamentController");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, BREEDS_URL } = process.env;
const { Temperament } = require("./src/db");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  //pruebo la conexion con la base de datos
  console.log("conexion con la base de datos correcta");
  //traigo todos los temperamentos de la api externa
  axios
    .get(`${BREEDS_URL}?api_key=${API_KEY}`)

    .then((temp) => {
      let arrayStr = temp.data.map((el) => el.temperament);

      let arrayAllTemp = allTemperaments(arrayStr);

      let arrayUniqueTemp = filterDuplicates(arrayAllTemp);

      Temperament.bulkCreate(
        arrayUniqueTemp.map((t) => {
          return {
            name: t,
          };
        })
      );

      server.listen(3001, () => {
        console.log("%s listening at 3001"); // eslint-disable-line no-console
      });
    });
});
