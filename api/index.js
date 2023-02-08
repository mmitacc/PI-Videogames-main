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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
// force: true // Elimina todas las tablas de la DB y luego re-crea en base a los Models
// alter: true // ACTUALIZA las tablas de la DB en base a los Models
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
})
.catch(err => console.error({Error: err.message}));
