var app = new Vue({
    el: "#wrapper",
    data: {
        mensaje: "",
        //uri: "http://localhost/Laravel/API_Pasta_Solucion/public/",
        uri: "http://pastasolucion.com/API_Pasta_Solucion/API_Pasta_Solucion/public/",
        uri2:'http://pastasolucion.com/Administrador/',
        //uri2: 'http://127.0.0.1:5500/',
        usuario: 'sebastianpassa80@gmail.com',
        clave: ''
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
                location.href = this.uri2 + "index.html";
            } else {
                console.log('sesion inactiva');
            }
        },
        reset(response) {
            this.usuario = "";
            this.clave = "";
            if (response.data == 1) {
                location.href = this.uri2 + "index.html";
            } else {
                location.href = this.uri2 + "page-login.html";
            }
        },
        EnviarForm() {
            let $this = this;
            axios
                .post(this.uri + "login", {
                    usuario: this.usuario,
                    clave: this.clave
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