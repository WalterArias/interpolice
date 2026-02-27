//capa modelo para el modulo de ciudadanos

// importamos la conexion
import { db } from "../config/bdatos.js";
// activar el manejo de promesas (asincronica)
// const db = cnx.promise();

//creamos el modulo : usando el concepto de orientado a objetos
// la clase Modelo correspondiente a ciudadano

export const CiudadanoModel = {
  //LISTAR TODOS : APLICAMOS FUNCIONES ASINCRONICAS PARA APROVECHAR
  // LAS PROMESAS (LOS HILOS DE EJECUCION)
  findALL: async () => {
    const sql = "SELECT * FROM ciudadano ORDER BY apellidos";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql);
    return rows;
  },
  // buscar por id, recibe el id como parametro
  findById: async (id) => {
    const sql = "SELECT * FROM ciudadano WHERE codigo=?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
  // borramos teniendo en cuenta el id que llega del controlador por parametro
  delete: async (id) => {
    const sql = "DELETE  FROM ciudadano WHERE codigo=?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
  create: async (data) => {
    const sql = "INSERT INTO ciudadano SET ?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [data]);
    return rows;
  },
  update: async (id, data) => {
    const sql = "UPDATE ciudadano SET ? WHERE codigo = ?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [data, id]);
    return rows;
  },
};
