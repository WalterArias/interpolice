//modulo para conexion a la base de datos
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
let cnx;
try {
  cnx = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  const conexion = await cnx.getConnection();
  console.log(`Conexión a la base de datos establecida correctamente`);
  conexion.release();
} catch (error) {
  console.error(` Error en la conexión: ${error.message}`);
}
export const db = cnx;
