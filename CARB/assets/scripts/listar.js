var app = new Vue({
    el: "#wrapper",
    data: {
        mensaje: "",
        //uri: "http://localhost/Laravel/API_Pasta_Solucion/public/",
        uri: "http://pastasolucion.com/API_Pasta_Solucion/API_Pasta_Solucion/public/",
        uri2:'http://pastasolucion.com/Administrador/',
        //uri2: 'http://127.0.0.1:5500/',
        items: []
    },
    mounted() {
        this.sesion();
        this.inicializarTabla();
    },
   methods: {
    setear(items) {
      this.items = items;
    },
    sesion() {
      let $this = this;
      axios
        .get(this.uri + "sesion")
        .then(function(response) {
          $this.redirectSesion(response.data);
        })
        .catch(function(error) {
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
    redireccionar(respuesta) {
      if (respuesta.data == "sesion cerrada") {
        location.href = this.uri2 + "page-login.html";
      }
    },
    inicializarTabla() {
      let $this = this;
      axios
        .get(this.uri + "ofertas")
        .then(function(response) {
          $this.setear(response.data.Ofertas);
          //console.log(response.data.Ofertas);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    CambiarEstado(id, nuevo_estado) {
      //alert(id);
      //alert(nuevo_estado);
      let $this = this;
      axios
        .post(this.uri + "cambio_estado", {
          id: id,
          nuevo_estado: nuevo_estado
        })
        .then(function(response) {
          $this.inicializarTabla();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    RutaIMG: function(nombre_img) {
      return this.uri + "images/" + nombre_img;
    },
    suspensivos(texto, limite) {
      var puntosSuspensivos = "...";
      if (texto.length > limite) {
        texto = texto.substring(0, limite) + puntosSuspensivos;
      }

      return texto;
    },
    arreglarFecha(fecha) {
      var res = fecha.split("-");
      let ano = res[0];
      let mes = res[1];
      let dia = res[2];
      return dia + "-" + mes + "-" + ano;
    },
    Logout() {
      let $this = this;
      axios
        .get(this.uri + "logout")
        .then(function(response) {
          $this.redireccionar(response);
          //console.log(response.data.Ofertas);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
