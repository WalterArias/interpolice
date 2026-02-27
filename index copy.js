import express from "express";
import cors from 'cors'
import {ciudadano} from "./modules/ciudadano.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json()); // Para que el servidor entienda JSON en el body
app.use(cors())
// Rutas
app.use("/api", ciudadano);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Server iniciado en : http://localhost:${PORT}`);
});
