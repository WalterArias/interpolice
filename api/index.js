const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//rutas de la app
//microservicio people
app.use("/", require("./modules/people"));
app.use("/", require("./modules/history"));

app.listen(port, () => {
  console.log(`app on in port: ${port}`);
});
