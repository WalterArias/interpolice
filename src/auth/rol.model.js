import { db } from "../config/bdatos.js";
export const RolModel = {
  findALL: async () => {
    const sql = "SELECT * FROM roles ORDER BY nombre_rol";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql);
    return rows;
  },

  findById: async (id) => {
    const sql = "SELECT * FROM roles WHERE id_rol=?";
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
  create: async (data) => {
    const sql = "INSERT INTO roles SET ?";
    const [rows] = await db.query(sql, [data]);
    return rows;
  },
  update: async (id, data) => {
    const sql = "UPDATE roles SET ? WHERE id_rol = ?";
    const [rows] = await db.query(sql, [data, id]);
    return rows;
  },
  delete: async (id) => {
    const sql = "DELETE  FROM roles WHERE id_rol=?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
};
