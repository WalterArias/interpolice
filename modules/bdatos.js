//modulo para conexion a la base de datos
import mysql from "mysql2";
let cnx;
try {
  cnx = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "interpolice",
    port: "3306",
  });
  // console.log(`conexion exitosa `);
} catch (error) {
  console.log(`Ha ocurrido un error en la conexion: ${error.message}`);
}
export { cnx };
