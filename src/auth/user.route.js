// las rutas del modulo ciudadano

import { Router } from "express";
// Importamos la logica del controlador para construir
// cada interaccion de la ruta : get, post, put, delete
import * as usuarioCtr from "./user.controller.js";
// instanciamos el metodo router del express para poder crear las rutas
const router = Router();

// las rutas del modulo
// ruta para listar todos
router.get("/usuario/listartodos", usuarioCtr.getUsers);
router.get("/usuario/listarporid/:id", usuarioCtr.getUserById);
router.post("/usuario/crear", usuarioCtr.createUser);
router.delete("/usuario/borrar/:id", usuarioCtr.deleteUser);
router.put("/usuario/actualizar/:id", usuarioCtr.updateUser);
export default router;
