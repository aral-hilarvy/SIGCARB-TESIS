var ecabezado_uso_tierra = new Vue({
  el: "#ecabezado_uso_tierra",
  data: {
    uri: "http://localhost:3978/api/",
    ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
    numero_encuesta: 0,
    fecha: "",
    hora: "",
    latitud: "",
    longitud: "",
    altitud:'',
    encuestador: "",
    nombre_encuestador:'',
  },
  mounted() {
    this.GetNumEncuesta();
  },
  methods: {
    Asignar(valor) {
      this.numero_encuesta = valor.resultado;
      if (localStorage.id) {
        this.id_usuario = localStorage.id;
        this.nombre_encuestador=localStorage.nombre+' '+localStorage.apellido;
      }
    },
    GetNumEncuesta() {
      let $this = this;
      fetch(this.uri + "encuesta_uso_tierra/numero_encuesta")
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => $this.Asignar(response));
    },
    Registrar() {

      let $this = this;
      var data = {

        num_encuesta: this.numero_encuesta,
        fecha: this.fecha,
        hora: this.hora,
        latitud: this.latitud,
        longitud: this.longitud,
        altitud:this.altitud,
        encuestador: this.id_usuario,
      };

      fetch(this.uri + "encuesta_uso_tierra/registrar", {
          method: "POST", // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response)
          localStorage.fecha = $this.fecha;
          localStorage.latitud = this.latitud;
          localStorage.longitud = this.longitud;
          localStorage.numero_encuesta = this.numero_encuesta;
          localStorage.id_encuesta_union = response.resultado.id;

          window.location.href = $this.ubicacion + "html_Encuesta_Uso_Tierra/Formulario_Encuesta_Uso_Tierra_1.html";
        });
    }

  },
  filters: {
    agregar: function (value) {
      if (!value) return ''
      var str = "" + value
      var pad = "0000"
      var ans = pad.substring(0, pad.length - str.length) + str
      return ans;
    }
  }
});
