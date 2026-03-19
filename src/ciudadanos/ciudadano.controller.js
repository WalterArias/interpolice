// controlador para ciudadano: encargado de escuchar y responder las
//peticiones

import { CiudadanoModel } from "./ciudadano.model.js";

export const getCiudadanos = async (req, res) => {
  // codigo protegido con try..catch
  try {
    const results = await CiudadanoModel.findALL();
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      error: "error al listar los ciudadanos",
    });
  }
};

// buscar ciudadano por el parametro ID
export const getCiudadanoById = async (req, res) => {
  // codigo protegido con try..catch
  try {
    const results = await CiudadanoModel.findById(req.params.id);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "error al buscar el ciudadano",
    });
  }
};
//insertar un registro
export const createCiudadano = async (req, res) => {
  // codigo protegido con try..catch
  const datos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    fechanace: req.body.fecha,
    foto: req.body.foto,
    idplanetaorigen: req.body.idplanetaorigen,
    codigoqr: req.body.codigoqr,
    estado: req.body.estado,
    email: req.body.email,
  };
  try {
    const results = await CiudadanoModel.create(datos);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "error en la consulta:" + error,
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
      error: "error al eliminar el ciudadano" + error,
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
      error: "ocurrió un error en la actualizacion -" + error,
    });
  }
};
