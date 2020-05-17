var app = new Vue({
  el: "#wrapper",
  data: {
    mensaje: "",
    band: false,
    //uri: "http://localhost/Laravel/API_Pasta_Solucion/public/",
    uri: "http://pastasolucion.com/API_Pasta_Solucion/API_Pasta_Solucion/public/",
    uri2:'http://pastasolucion.com/Administrador/',
    //uri2: 'http://127.0.0.1:5500/',
    FromObj: {
      titulo: "",
      descripcion: "",
      fecha_ini: "",
      fecha_fin: "",
      file: null
    },
    nombre_archivo: ""
  },
  mounted() {
    this.sesion();
  },
  methods: {
    sesion() {
      let $this = this;
      axios
        .get(this.uri + "sesion")
        .then(function (response) {
          $this.redirectSesion(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    redirectSesion(estado) {
      if (estado == 1) {
        console.log("sesion activa");
      } else {
        location.href = this.uri2 + "page-login.html";
      }
    },
    reset(response) {
      this.FromObj.titulo = "";
      this.FromObj.descripcion = "";
      this.FromObj.file = null;
      this.band = true;
      this.mensaje = response.data;
      this.nombre_archivo = "";
    },
    redireccionar(respuesta) {
      if (respuesta.data == "sesion cerrada") {
        location.href = this.uri2 + "page-login.html";
      }
    },
    previewFiles() {
      this.FromObj.file = document.getElementById("file-upload").files[0];
      this.nombre_archivo = this.FromObj.file.name;
      //document.getElementById("info").innerHTML = this.FromObj.file.name;
    },
    Logout() {
      let $this = this;
      axios
        .get(this.uri + "logout")
        .then(function (response) {
          $this.redireccionar(response);
          //console.log(response.data.Ofertas);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    EnviarForm() {
      let $this = this;

      const formData = new FormData();
      formData.append("archivo", this.FromObj.file);
      formData.append("nombre_archivo", this.FromObj.file.name);
      formData.append("titulo", this.FromObj.titulo);
      formData.append("descripcion", this.FromObj.descripcion);
      //console.log(formData.get("archivo"));
      axios
        .post(this.uri + "ofertas", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function (response) {
          console.log(response);
          $this.reset(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
});