import express from "express";
import cors from "cors";
// import 'dotenv/config'

import ciudadanoRutas from "./src/ciudadanos/ciudadano.route.js";
const app = express();

// Middlewares
app.use(express.json()); // Para que el servidor entienda JSON en el body
app.use(cors());
// Rutas
app.use("/api", ciudadanoRutas);
export default app;
