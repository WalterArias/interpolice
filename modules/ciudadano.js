// modulo para manipulacion del usuario
import express from "express";
import { cnx } from "./bdatos.js";
export const ciudadano = express();
// crud basico de ciudadanos

// listar todos los ciudadanos
ciudadano.get("/ciudadano/listartodos", (req, res) => {
  //hacer la consulta
  let sql = "SELECT * FROM ciudadano ORDER BY apellidos";
  // ejecutar la consulta en la base de datos
  cnx.query(sql, (err, results, fields) => {
    // console.log(err);
    // console.log(results);
    // console.log(fields);
    res.send({ results });
  });
});
// listar ciudadano por id
ciudadano.get("/ciudadano/listarporid/:id", (req, res) => {
  // recibimos el parametro de la consulta
  let id = req.params.id;
  //hacer la consulta, por seguridad use consulta parametrizada
  let sql = "SELECT * FROM ciudadano WHERE codigo=?";
  //let sql = "SELECT * FROM ciudadano WHERE id=${id}";
  // ejecutar la consulta en la base de datos
  cnx.query(sql, [id], (err, results, fields) => {
    res.status(200).send({ results });
  });
});

// borrar registro -- borrado real
ciudadano.delete("/ciudadano/borrarporid/:id", (req, res) => {
  // recibimos el parametro de la consulta
  let id = req.params.id;
  //hacer la consulta, por seguridad use consulta parametrizada
  let sql = "DELETE FROM ciudadano WHERE codigo=?";
  //let sql = "SELECT * FROM ciudadano WHERE id=${id}";
  // ejecutar la consulta en la base de datos
  cnx.query(sql, [id], (err, results, fields) => {
    res.status(200).send({ results });
  });
});

// crear ciudadanos
ciudadano.post("/ciudadano/crear", (req, res) => {
  // recibimos los parametros enviados en la consulta - payload - body en un objeto JS
  let datosFormulario = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    fechaNace: req.body.fecha,
    planetaOrigen: req.body.planetanace,
    planetaReside: req.body.planetareside,
    foto: req.body.foto,
    codigoQr: req.body.codigoqr,
    estado: req.body.estado,
  };

  //hacer la consulta, por seguridad use consulta parametrizada
  let sql = "INSERT INTO ciudadano SET ?";
  //let sql = "SELECT * FROM ciudadano WHERE id=${id}";
  // ejecutar la consulta en la base de datos
  cnx.query(sql, [datosFormulario], (err, results, fields) => {
    res.status(200).send({ results });
  });
});

// Editar : recibir una payload en el body de la peticion (request) y el id

ciudadano.put("/ciudadano/editar/:id", (req, res) => {
  // recibimos los parametros enviados en la consulta - payload - body en un objeto JS
  let id = req.params.id;
  let datosFormulario = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    fechaNace: req.body.fecha,
    planetaOrigen: req.body.planetanace,
    planetaReside: req.body.planetareside,
    foto: req.body.foto,
    codigoQr: req.body.codigoqr,
    estado: req.body.estado,
  };

  //hacer la consulta, por seguridad use consulta parametrizada
  let sql = "UPDATE ciudadano SET ? WHERE codigo = ?";
  //let sql = "SELECT * FROM ciudadano WHERE id=${id}";
  // ejecutar la consulta en la base de datos
  cnx.query(sql, [datosFormulario, id], (err, results, fields) => {
    res.status(200).send({ results });
  });
});
// export default ciudadano;
