import express from "express";
import cors from "cors";
// import 'dotenv/config'

import ciudadanoRutas from "./src/ciudadanos/ciudadano.route.js";
import rolRutas from "./src/auth/rol.route.js";
import usuarioRutas from "./src/auth/user.route.js";
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
// Rutas
app.use("/api", ciudadanoRutas);
app.use("/api", rolRutas);
app.use("/api", usuarioRutas);
export default app;
