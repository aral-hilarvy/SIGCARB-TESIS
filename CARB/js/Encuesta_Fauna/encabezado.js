var modal_consultar_EspacioMuestreo = new Vue({
  el: "#encabezado",
  data: {
    uri: "http://localhost:3978/api/",
    ubicacion: window.location.href.split("/").slice(0, window.location.href.split("/").length-2).join('/')+'/',
    numero_encuesta: 0,
    fecha: "",
    localidad: "",
    zona: "",
    cabeza_familia: "",
    id_usuario: "",

  },
  mounted() {
    this.GetNumEncuesta();
  },
  methods: {
    Asignar(valor) {
      this.numero_encuesta = valor.resultado;
      if (localStorage.id) {
        this.id_usuario = localStorage.id;
      }
    },
    GetNumEncuesta() {
      let $this = this;
      fetch(this.uri + "encuesta_fauna/numero_encuesta")
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => $this.Asignar(response));
    },
    Registrar() {
      var f = new Date();
      let $this = this;
      var data = {
        id_usuario: this.id_usuario,
        localidad: this.localidad,
        zona: this.zona,
        numero_encuesta: this.numero_encuesta,
        cabeza_familia: this.cabeza_familia,
        //fecha: (f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear())
        fecha: f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()
      };

      fetch(this.uri + "encuesta_fauna/registrar", {
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
          localStorage.localidad = this.localidad;
          localStorage.zona = this.zona;
          localStorage.id_encuesta_union = response.resultado.id;

          window.location.href = $this.ubicacion + "html_Encuesta_Fauna/Formulario_Encuesta_Fauna_2.html";
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
