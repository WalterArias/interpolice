// controlador para ciudadano: encargado de escuchar y responder las
//peticiones

import { UserModel } from "./user.model.js";

export const getUsers = async (req, res) => {
  // codigo protegido con try..catch
  try {
    const results = await UserModel.Model.findALL();
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      error: `error al listar : ${error}`,
    });
  }
  S;
};
// buscar ciudadano por el parametro ID
export const getUserById = async (req, res) => {
  // codigo protegido con try..catch
  try {
    const results = await UserModel.findById(req.params.id);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: `error al listar : ${error}`,
    });
  }
};
//insertar un registro
export const createUser = async (req, res) => {
  // codigo protegido con try..catch
  const datos = {
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    password: req.body.password,
    roles: req.body.roles_idrol,
    estado: req.body.estado,
  };
  try {
    const results = await UserModel.create(datos);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: `ocurrió un error en la insercion:${error}`,
    });
  }
};
// Borrar ciudadano
export const deleteUser = async (req, res) => {
  try {
    const results = await UserModel.delete(req.params.id);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: `ocurrió un error al eliminar:${error}`,
    });
  }
};
//actualizar ciudadano

export const updateUser = async (req, res) => {
  try {
    const results = await UserModel.update(req.params.id, req.body);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: `ocurrió un error al actualizar ${error}`,
    });
  }
};
