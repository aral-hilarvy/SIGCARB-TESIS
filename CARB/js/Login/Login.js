var modal_registro_usuario = new Vue({
  el: "#wrapper",
  data: {
    mensaje: "algo",
    uri: "http://localhost:3978/api/",
    posterior_uri: "user/login",
    ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
    Usuario: {
      cedula: "",
      nombre: "",
      apellido: "",
      id_recurso_natural: 0,
      usuario: "",
      password: "",
      rol: "",
      status: ""
    },
    Respuesta: {
      status: "ESTATUS",
      message: "PRUEBA"
    },
    usuario: "",
    clave: "",
    token: ""
  },
  mounted() {
    this.getEstadoSesion();
  },
  methods: {
    getEstadoSesion() {

      if (localStorage.token) {
        if (localStorage.rol_usuario == "Administrador") {
          window.location.href =
            this.ubicacion +
            "html_Usuario_Admin/indexUsuarioAdmin.html";
        } else {
          window.location.href =
            this.ubicacion +
            "html_Usuario_Comun/indexUsuarioComun.html";
        }
      }
    },
    EnviarForm: function () {
      let validate = this.Validar();
      let $this = this;
      var data = {
        usuario: this.usuario,
        password: this.clave,
        gethash: 1
      };
      if (validate) {
        fetch(this.uri + this.posterior_uri, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .catch(error => console.error("Error:", error))
          .then(response => {
            console.log(response);
            this.token = response.token;
            var data = {
              usuario: this.usuario,
              password: this.clave
            };

            fetch(this.uri + this.posterior_uri, {
                method: "POST", // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                  "Content-Type": "application/json",
                  Authorization: this.token
                }
              })
              .then(res => res.json())
              .catch(error => console.error("Error:", error))
              .then(response => {
                console.log(response);
                localStorage.token = this.token;
                localStorage.nombre = response.usuario.nombre;
                localStorage.apellido = response.usuario.apellido;
                localStorage.id = response.usuario.id;
                localStorage.id_recurso_natural =
                  response.usuario.id_recurso_natural;
                localStorage.rol_usuario = response.usuario.rol_usuario;
                localStorage.status = response.usuario.status;
                localStorage.usuario = response.usuario.usuario;
                if (response.usuario.rol_usuario == "Administrador") {
                  window.location.href =
                    this.ubicacion +
                    "html_Usuario_Admin/indexUsuarioAdmin.html";
                } else {
                  window.location.href =
                    this.ubicacion +
                    "html_Usuario_Comun/indexUsuarioComun.html";
                }
              });
            //$this.AlertStyle(response.title, response.message, response.status);
          });
      }
    },
    AlertStyle(titulo, descripcion, icono) {
      swal({
        title: `${titulo}`,
        text: `${descripcion}`,
        icon: `${icono}`,
        buttons: {
          OK: true
        }
      }).then(value => {
        console.log(value);
        if (icono == "error") {
          $("#modal_registro_usuario").modal("show");
        } else {
          this.VaciarForm();
        }
      });
    },
    Validar() {
      if (this.usuario === "_" || this.clave === "") {
        this.AlertStyle(
          "¡ATENCIÓN!",
          "Debe introducir todos los datos solicitados.",
          "error"
        );
        return false;
      } else {
        return true;
      }
    },
    VaciarForm() {
      this.usuario = "";
      this.clave = "";
    }
  }
});