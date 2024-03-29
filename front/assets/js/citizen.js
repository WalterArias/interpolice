const url = "http://localhost:3000/people/";
const btnCrear = document.querySelector("#btnCrear");
let mitabla = document.querySelector("#mitabla");
const id = document.querySelector("#id");
const named = document.querySelector("#named");
const lastname = document.querySelector("#lastname");
const nickname = document.querySelector("#nickname");
const foto = document.querySelector("#formFile"); //.files[0].name
const imgForm = document.querySelector("#imagen");
const email = document.querySelector("#email");
const tipo = document.querySelector("#tipo");
const frmcitizens = document.querySelector("#frmcitizens");
const formData = new FormData();

//modal
const modalCitizen = new bootstrap.Modal(
  document.getElementById("modalCitizen")
);
var opcion = "";

btnCrear.addEventListener("click", () => {
  named.value = "";
  lastname.value = "";
  nickname.value = "";
  email.value = "";
  tipo.value = "";
  modalCitizen.show();
  opcion = "crear";
});

// evento requerido para seleccionar valores de una fila de tabla
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
//PROCEDIMIENTO LISTAR TODOS LOS REGISTROS
const listarCiudadanos = () => {
  fetch(url + "listing")
    .then((response) => {
      return response.json();
    })
    .then((datos) => {
      datos.forEach((dato) => {
        let fila = `<tr>
        <td>${dato.id}</td>
          <td>${dato.name}</td>
          <td>${dato.lastname}</td> 
          <td>${dato.nickname} </td>
          <td>${dato.photo} </td>
          <td>${dato.email} </td>
          <td>${dato.type} </td>
          <td><button class="btnEditar btn btn-primary btn-sm">Editar</button></td>
          <td><button class="btnBorrar btn btn-danger btn-sm">Borrar</button></td>
          </tr>`;
        mitabla.innerHTML += fila;
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "No es posible conectarse a la API",
        text: error,
      });
    });
};
listarCiudadanos();

// PROCEDIMIENTO PARA BORRAR
on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  //const id = fila.firstElementChild.innerHTML;
  let id = fila.children[0].innerHTML;
  Swal.fire({
    title: "Seguro que desea borrar el Id: ? " + id,
    /*  text: "You won't be able to revert this!", */
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro !",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url + "deleteid/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => location.reload());
    }
  });
});

//PROCEDIMIENTO EDITAR
on(document, "click", ".btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode;
  //const id = fila.firstElementChild.innerHTML; //otra forma deinvocar el valor de la fila
  //valores de la fila
  let idForm = fila.children[0].innerHTML;
  let nameForm = fila.children[1].innerHTML;
  let lastnameForm = fila.children[2].innerHTML;
  let apodoForm = fila.children[3].innerHTML;
  let imagen = fila.children[4].innerHTML;
  let emailForm = fila.children[5].innerHTML;
  let tipoForm = fila.children[6].innerHTML;

  fetch("http://localhost:3000/images/" + imagen, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    /*   .then((response) => response.json()) */
    .then((data) => {
      const imgurl = data.url;
      imgForm.src = imgurl;
    });
  /*  foto.src = imgurl; */
  id.value = idForm;
  named.value = nameForm;
  lastname.value = lastnameForm;
  nickname.value = apodoForm;
  email.value = emailForm;
  tipo.option = tipoForm;

  opcion = "editar";
  modalCitizen.show();
});

/**
 * funcion asincronica que ejecuta 2 fetch
 * @date 3/19/2024 - 7:43:04 PM
 *
 * @async
 * @returns {*}
 */
async function actualizar() {
  await fetch(url + "update/" + id.value, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: named.value,
      lastname: lastname.value,
      nickname: nickname.value,
      email: email.value,
      type: 2,
    }),
  });

  formData.append("foto", foto.files[0]); //necesario para usar enctype="multipart/form-data"
  await fetch(url + "subirimagen/" + id.value, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      Swal.fire({
        title: response.status,
        text: response.mensaje,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    });
}

// GUARDAR EL FORMULARIO
frmcitizens.addEventListener("submit", (e) => {
  e.preventDefault();
  if (opcion == "crear") {
    fetch(url + "create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: named.value,
        lastname: lastname.value,
        nickname: nickname.value,
        email: email.value,
        type: 2,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        Swal.fire({
          title: response.status,
          text: response.mensaje,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      });
  }
  if (opcion == "editar") {
    actualizar();
  }
  modalCitizen.hide();
});
