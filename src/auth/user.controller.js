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
    username: req.body.apellidos,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const results = await CiudadanoModel.create(datos);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "ocurrió un error en la insercion !",
    });
  }
};
// Borrar ciudadano
export const deleteCiudadano = async (req, res) => {
  try {
    const results = await CiudadanoModel.delete(req.params.id);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "error al eliminar el ciudadano",
    });
  }
};
//actualizar ciudadano

export const updateCiudadano = async (req, res) => {
  try {
    const results = await CiudadanoModel.update(req.params.id, req.body);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "ocurrió un error en la actualizacion !",
    });
  }
};
