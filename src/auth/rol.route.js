// las rutas del modulo ciudadano

import { Router } from "express";
// Importamos la logica del controlador para construir
// cada interaccion de la ruta : get, post, put, delete
import * as RolCtr from "./rol.controller.js";

const router = Router();

router.get("/rol/listartodos", RolCtr.getRoles);
router.get("/rol/listarporid/:id", RolCtr.getRolById);
router.post("/rol/crear", RolCtr.createRol);
router.delete("/rol/borrar/:id", RolCtr.deleteRol);
router.put("/rol/actualizar/:id", RolCtr.updateRol);
export default router;
