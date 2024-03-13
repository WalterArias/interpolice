/* microservicio para crear el CRUD del historial delictivo de las personas de la galaxia */

const express = require("express");
const history = express.Router();
const cnx = require("./bdata");

/* Desarrollo del CRUD */

//Consultar
history.get("/history/listing", (req, res) => {
  let sql = "select * from history order by date";
  cnx.query(sql, (error, data) => {
    try {
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({
        id: error.id,
        mensaje: error.message,
      });
    }
  });
});

//consultar por id
history.get("/history/listing/:id", (req, res) => {
  let id = req.params.id;
  let sql = "select * from history  where id = " + id;

  //cnx.query("select * from people  where id = ?", id, (error, data) => {
  cnx.query(sql, (error, data) => {
    try {
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      //throw `hay un error en la consulta : ${error}`;
      /*   res.status(404).send({
          id: error.id,
          mensaje: error.message,
        }); */
    }
  });
});
//insertar un antecedente : metodo post
history.post("/history/create", (req, res) => {
  let frmdata = {
    description: req.body.description,
    date: req.body.date,
    note: req.body.note,
  };
  /*  console.log(frmdata); */
  /* 
  let sql = "select * from people  where id = " + id; */

  //cnx.query("select * from people  where id = ?", id, (error, data) => {
  cnx.query("INSERT INTO history SET ?", frmdata, (error, data) => {
    try {
      res.status(200).send("Insercion exitosa !");
    } catch (error) {
      console.log(error);
      //throw `hay un error en la consulta : ${error}`;
      /*   res.status(404).send({
            id: error.id,
            mensaje: error.message,
          }); */
    }
  });
});

//actualizar un registro

history.put("/history/update/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    description: req.body.description,
    date: req.body.date,
    note: req.body.note,
  };

  cnx.query(
    "UPDATE history SET ? WHERE id = ?",
    [frmdata, id],
    (error, data) => {
      try {
        res.status(200).send("Actualización exitosa !");
      } catch (error) {
        console.log(error);
        //throw `hay un error en la consulta : ${error}`;
        /*   res.status(404).send({
              id: error.id,
              mensaje: error.message,
            }); */
      }
    }
  );
});

//eliminar por id
//eliminar fisico de la base de datos

history.delete("/history/deleteid/:id", (req, res) => {
  let id = req.params.id;
  let sql = "delete from history  where id = " + id;

  //cnx.query("select * from people  where id = ?", id, (error, data) => {
  cnx.query(sql, (error, data) => {
    try {
      res.status(200).send("borrado exitoso");
    } catch (error) {
      console.log(error);
      //throw `hay un error en la consulta : ${error}`;
      /*   res.status(404).send({
            id: error.id,
            mensaje: error.message,
          }); */
    }
  });
});

module.exports = history;
