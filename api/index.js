//                      /\     /\
//                     /  \▒▒▒/  \
//                  /\/ ▒▒▒▒▒▒▒▒▒ \/\
//                   \ ▒▒▒▒▒▒▒▒▒▒▒/
//                  | ▒  ¨¨   ¨¨  ▒ |
//                   \  (| o_o |)  /
//                    -*0\ -¤-  /0*-
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`mm`\ _ /`mm`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                      'www-www'
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.
// .sync({ force: true }) // Elimina todas las tablas de la DB y luego re-crea en base a los Models
// .sync({ alter: true }) // ACTUALIZA las tablas de la DB en base a los Models
conn
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening at ${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((err) => console.error({ Error: err.message }));
