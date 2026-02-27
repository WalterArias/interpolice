// las rutas del modulo ciudadano

import { Router } from "express";
// Importamos la logica del controlador para construir
// cada interaccion de la ruta : get, post, put, delete
import * as CiudadanoCtr from "./ciudadano.controller.js";
// instanciamos el metodo router del express para poder crear las rutas
const router = Router();

// las rutas del modulo
// ruta para listar todos
router.get("/ciudadano/listartodos", CiudadanoCtr.getCiudadanos);
router.get("/ciudadano/listarporid/:id", CiudadanoCtr.getCiudadanoById);
router.post("/ciudadano/crear", CiudadanoCtr.createCiudadano);
router.delete("/ciudadano/borrar/:id", CiudadanoCtr.deleteCiudadano);
router.put("/ciudadano/actualizar/:id", CiudadanoCtr.updateCiudadano);
export default router;
