const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

var corsOptions = {
  origin: "http://127.0.0.1:5500",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/images", express.static("uploads/avatars/"));  //ruta estatica

//rutas de la app
//microservicio people
app.use("/", require("./modules/people"));
app.use("/", require("./modules/users"));
app.use("/", require("./modules/history"));

app.listen(port, () => {
  console.log(`app on in port: ${port}`);
});
