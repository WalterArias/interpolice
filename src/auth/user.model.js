//capa modelo para el modulo de ciudadanos

// importamos la conexion
import { db } from "../config/bdatos.js";
import bcrypt from "bcryptjs";

//creamos el modulo : usando el concepto de orientado a objetos
// la clase Modelo correspondiente a ciudadano

export const UserModel = {
  //LISTAR TODOS : APLICAMOS FUNCIONES ASINCRONICAS PARA APROVECHAR
  // LAS PROMESAS (LOS HILOS DE EJECUCION)
  findALL: async () => {
    const sql = "SELECT * FROM users ORDER BY usernamer";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql);
    return rows;
  },
  // buscar por id, recibe el id como parametro
  findById: async (id) => {
    const sql = "SELECT * FROM users WHERE id=?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
  // borramos teniendo en cuenta el id que llega del controlador por parametro
  // delete: async (id) => {
  //   const sql = "DELETE  FROM users WHERE id=?";
  //   //almacenamos la respuesta en un arreglo
  //   const [rows] = await db.query(sql, [id]);
  //   return rows;
  // },

  // TODO: creamos el usuario con HASHING
  create: async (data) => {
    let email = data.email;
    let password = data.password;
    // validamos que el email no exista ! , el usuario lo validaremos por el email
    const [emailExiste] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (emailExiste.length > 0) {
      throw new Error("El email ya está registrado");
    }
    const userNuevo = {
      nombre: userData.nombre,
      email: email,
      telefono: userData.telefono,
      password: bcrypt.hashSync(password, 11), // Encriptar la contraseña
      roles_idroles: userData.roles_idroles,
      estado: userData.estado,
    };
    const sql = "INSERT INTO users SET ?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [userNuevo]);
    return rows;
  },
  update: async (id, data) => {
    const sql = "UPDATE users SET ? WHERE id = ?";
    //almacenamos la respuesta en un arreglo
    const [rows] = await db.query(sql, [data, id]);
    return rows;
  },
};
