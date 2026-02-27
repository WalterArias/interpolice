// crea una constante con el puerto local o el asignado en
// las variables globales de la aplicacion
import app from "./app.js";
const PORT = 3000 || process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server iniciado en : http://localhost:${PORT}`);
});
