const express = require("express");
const cors = require("cors");
/* const body = require("body-parser"); */
/* const bodyParser = require("body-parser"); */
const app = express();
const port = 3000;
/* app.use(bodyParser.json()); */
app.use(cors());
app.use(express.json());

//rutas de la app
//microservicio people
app.use("/", require("./modules/people"));
app.use("/", require("./modules/history"));

app.listen(port, () => {
  console.log(`app on in port: ${port}`);
});
