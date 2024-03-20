/* microservicio para crear el CRUD de las personas de la galaxia */
const express = require("express");
const people = express.Router();
const cnx = require("./bdata");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// configuracion del middleware para subir archivos al server
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars/");
  },
  filename: (req, file, cb) => {
    cb(null, "pe-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: almacenamiento });

//==================================================================
/* Desarrollo del CRUD */
/* 
function contarRegistros() {
  let sql = "SELECT count(id) from people";
  cnx.query(sql, (error, data) => {
    if (!error) {
      return typeof data;
    } else {
      return "error";
    }
  });
}
console.log(contarRegistros()); */
//Consultar
people.get("/people/listing", (req, res) => {
  // let sql1 = "SELECT COUNT(*) from people";
  let sql2 = "SELECT * from PEOPLE ORDER BY id LIMIT 10";
  cnx.query(sql2, (error, data) => {
    if (!error) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        status: "error",
        mensaje: error.message,
      });
    }
  });
});

// consultar con paginación

people.get("/people/paginate/:page", (req, res) => {
  let page;
  if (req.params.page) {
    page = req.params.page;
  } else {
    page = 0;
  }

  let sql = "SELECT * from PEOPLE ORDER BY id LIMIT 10 OFFSET " + page;
  cnx.query(sql, (error, data) => {
    if (!error) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        status: "error",
        mensaje: error.message,
      });
    }
  });
});

//consultar por id
people.get("/people/listing/:id", (req, res) => {
  let id = req.params.id;
  let sql = "select * from people  where id = " + id;
  cnx.query(sql, (error, data) => {
    if (!error) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        status: "error",
        mensaje: error.message,
      });
    }
  });
});
//insertar una persona : metodo post
people.post("/people/create", (req, res) => {
  let frmdata = {
    name: req.body.name,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    photo: "foto.png",
    email: req.body.email,
    type: req.body.type,
  };

  cnx.query("INSERT INTO people SET ?", [frmdata], (error, data) => {
    if (!error) {
      res.status(200).send({
        status: "ok",
        mensaje: "Operación exitosa",
      });
    } else {
      console.log(error);
      res.status(404).send({
        status: "error",
        mensaje: error.message,
      });
    }
  });
});
// update People

people.put("/people/update/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    name: req.body.name,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    email: req.body.email,
    type: req.body.type,
  };

  cnx.query(
    "UPDATE people SET ? WHERE id = ?",
    [frmdata, id],
    (error, data) => {
      if (!error) {
        res.status(200).send({
          status: "ok",
          mensaje: "Operación exitosa",
        });
      } else {
        console.log(error);
        res.status(404).send({
          status: "error",
          mensaje: error.message,
        });
      }
    }
  );
});
//subir imagen
people.put("/people/subirimagen/:id", [upload.single("foto")], (req, res) => {
  //validamos que llegue el archivo en el request
  if (!req.file && !req.files) {
    res.status(400).send({
      status: "error",
      mensaje: "No existe archivo de imagen !",
    });
  }

  // obtenemos la extension del archivo de la imagen
  let archivo = req.file.originalname; //nombre del archivo
  let archivoSplit = archivo.split(".");
  let extension = archivoSplit[1];

  //validamos las extensiones de los archivos

  if (extension != "png" && extension != "jpg" && extension != "jpeg") {
    //si la extension es invalida, eliminamos del backend el archivo
    fs.unlink(req.file.path, (error) => {
      res.status(400).send({
        status: "error",
        mensaje: "Formato de imagen invalido !",
      });
    });
  } else {
    //recibimos parametro del request
    let id = req.params.id; // id de la persona
    let photo = req.file.filename;
    cnx.query(
      "UPDATE people SET photo =? WHERE id = ?",
      [photo, id],
      (error, data) => {
        if (error) {
          res.status(400).send({
            status: "error",
            mensaje: "Error en actualizacion de la imagen",
          });
        } else {
          res.status(200).send({
            status: "ok",
            mensaje: "La imagen se ha actualizado !",
          });
        }
      }
    );
  }
});

// devolver la imagen desde el frontend
people.get("/people/imagen/:archivo", (req, res) => {
  let archivo = req.params.archivo;
  //let ruta_api = "./uploads/avatars/" + archivo;

  if (!archivo) {
    res.send({
      ruta: "http://localhost:3000/images/" + archivo,
    });
  } else {
    res.send({
      status: "error",
    });
  }

  /* fs.access(ruta_api, (error) => {
    if (!error) {
      // return res.send(`<img src=public/images/${imageName}>`);
      // return res.sendFile(archivo, { root: __dirname + "/uploads/avatars/" });
      res.sendFile(path.resolve(ruta_api));
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "no existe la imagen",
        error,
        archivo,
        ruta_api,
      });
    }
  }); */
});

//eliminar por id

people.delete("/people/deleteid/:id", (req, res) => {
  let id = req.params.id;
  let sql = "delete from people  where id = " + id;

  cnx.query(sql, (error, data) => {
    if (!error) {
      res.send({
        status: "ok",
        mensaje: "Borrado Exitoso",
      });
    } else {
      res.send({
        status: "error",
        mensaje: "Hay un error en la operacion",
      });
    }
  });
});

module.exports = people;
