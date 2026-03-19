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

  create: async (data) => {
    let email = data.email;
    console.log(data);
    // validamos que el email no exista ! , el usuario lo validaremos por el email
    const [emailExiste] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (emailExiste.length > 0) {
      throw new Error("El email ya está registrado");
    }
    const userNuevo = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      password_hash: bcrypt.hashSync(data.password, 11), // Encriptar la contraseña
      id_rol: data.roles,
      estado: data.estado,
    };
    const sql = "INSERT INTO usuarios SET ?";
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
