var modal_registro_EspacioMuestreo = new Vue({
  el: "#modal_registro_EspacioMuestreo",
  data: {
    uri: "http://localhost:3978/api/",
    id_usuario: "",
    token: '',
    tipo_bosque: "",
    cod_espacio_muestreo: "",
    t_bosque: "",
    cant_continuos: 0,
    cant_fragmentados: 0,
    valor_incrementado: 0,
    valor_uri: '',
    data: null,
    id_grado_perturbacion: 0,
    latitud: '',
    longitud: '',
    grad_perturb: null
  },
  mounted() {
    this.InitGradoPerturbacion();
  },
  methods: {
    InitGradoPerturbacion() {
      let $this = this;
      fetch(this.uri + 'g_perturbacion/lists')
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => $this.inicializar(response));
    },
    inicializar(response) {
      console.log(response)
      this.grad_perturb = response.resultado;
    },
    setear(response) {
      console.log(response);

      if (this.tipo_bosque == "1") {
        this.t_bosque = "Bosque Continuo";
        this.cod_espacio_muestreo = "C" + (response.usuario.cant_continuos + 1);
        this.valor_uri = 'update_continuos';
        this.data = {
          cant_continuos: (response.usuario.cant_continuos + 1)
        }
      } else if (this.tipo_bosque == "2") {
        this.t_bosque = "Bosque Fragmentado";
        this.cod_espacio_muestreo = "F" + (response.usuario.cant_fragmentados + 1);
        this.valor_uri = 'update_fragmentados';
        this.data = {
          cant_fragmentados: (response.usuario.cant_fragmentados + 1)
        }
      }
      let validate = this.Validar();
      let $this = this;

      if (validate) {
        var data = {
          id_usuario: this.id_usuario,
          tipo_bosque: this.t_bosque,
          cod_espacio_muestreo: this.cod_espacio_muestreo,
          id_grado_perturbacion: this.id_grado_perturbacion,
          latitud: this.latitud,
          longitud: this.longitud
        };
        console.log(data);
        $("#modal_registro_EspacioMuestreo").modal("hide");
        fetch(this.uri + "tipo_muestreo/registrar", {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .catch(error => console.error("Error:", error))
          .then(response => {
            $this.AlertStyle(response.title, response.message, response.status);

            fetch(`${this.uri}user/${this.valor_uri}/${this.id_usuario}`, {
                method: "PUT", // or 'PUT'
                body: JSON.stringify(this.data), // data can be `string` or {object}!
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": this.token
                }
              })
              .then(res => res.json())
              .catch(error => console.error("Error:", error))
              .then(response => {
                console.log(response);
                //$this.AlertStyle(response.title, response.message, response.status);
              });
          });
      }
    },
    contadorRegistros() {
      if (localStorage.id) {
        this.id_usuario = localStorage.id;
        this.token = localStorage.token;
      }
      let $this = this;
      fetch(this.uri + "user/list/" + this.id_usuario, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token
          }
        })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => $this.setear(response));
    },
    Registrar_Esp_Mues: function () {
      this.contadorRegistros();
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
          $("#modal_registro_EspacioMuestreo").modal("show");
        } else {
          this.VaciarForm();
        }
      });
    },
    Validar() {
      if (this.tipo_bosque == "") {
        $("#Espacio_Muestreo").css("border-color", "#FF0000");
        this.AlertStyle("¡ATENCIÓN!", "Seleccione Espacio Muestreo", "error");
        return false;
      } else if (this.id_grado_perturbacion < 1) {
        $("#Grado_Perturbacion").css("border-color", "#FF0000");
        this.AlertStyle("¡ATENCIÓN!", "Seleccione Grado Perturbacion", "error");
        return false;
      } else if (this.latitud == '') {
        $("#latitud_EM").css("border-color", "#FF0000");
        this.AlertStyle("¡ATENCIÓN!", "Ingrese Latitud", "error");
        return false;
      } else if (this.longitud == '') {
        $("#longitud_EM").css("border-color", "#FF0000");
        this.AlertStyle("¡ATENCIÓN!", "Ingrese Longitud", "error");
        return false;
      } else {
        return true;
      }
    },
    VaciarForm() {
      this.tipo_bosque = "";
    }
  }
});