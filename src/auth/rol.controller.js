import { RolModel } from "./rol.model.js";

export const getRoles = async (req, res) => {
  try {
    const results = await RolModel.findALL();
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      error: `error al listar : ${error}`,
    });
  }
};
export const getRolById = async (req, res) => {
  try {
    const results = await RolModel.findById(req.params.id);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: `error al listar : ${error}`,
    });
  }
};

export const createRol = async (req, res) => {
  const datos = {
    nombre_rol: req.body.nombre_rol,
  };
  console.log(datos)
  try {
    const results = await RolModel.create(datos);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "ocurrió un error en la insercion !" + error,
    });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const results = await RolModel.delete(req.params.id);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "error al eliminar el ciudadano" + error,
    });
  }
};
export const updateRol = async (req, res) => {
  try {
    const results = await RolModel.update(req.params.id, req.body);
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      error: "ocurrió un error en la actualizacion !" + error,
    });
  }
};
