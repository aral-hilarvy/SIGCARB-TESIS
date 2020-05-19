var sesiones = new Vue({
    el: "#sesiones",
    data: {
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        uri: "http://localhost:3978/api/",
        posterior_uri: "recurso_natural/list/",
        recurso_natural: ''
    },
    mounted() {
        this.getEstadoSesion();
        this.getRecursoNatural();
    },
    methods: {
        logout() {
            if (localStorage.token) {
                localStorage.removeItem('token');
                window.location.href =
                    this.ubicacion +
                    "html_Login/login.html";
            }
        },
        getEstadoSesion() {
            res = window.location.href.split("/");
            let vista = res[res.length - 1];

            if (localStorage.token) {
                if (localStorage.rol_usuario == "Administrador") {
                    if (vista != "indexUsuarioAdmin.html") {
                        window.location.href = this.ubicacion + "html_Usuario_Admin/indexUsuarioAdmin.html";
                    }
                } else {
                    if (vista != "indexUsuarioComun.html") {
                        window.location.href = this.ubicacion + "html_Usuario_Comun/indexUsuarioComun.html";
                    }
                }
            } else {
                window.location.href =
                    this.ubicacion +
                    "html_Login/login.html";
            }
        },
        getRecursoNatural() {
            let $this = this;

            if (localStorage.id_recurso_natural) {
                fetch(this.uri + this.posterior_uri + localStorage.id_recurso_natural)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        this.recurso_natural = response.resultado.nombre;
                    });
            }
        }

    }
});