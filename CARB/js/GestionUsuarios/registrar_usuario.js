var modal_registro_usuario = new Vue({
    el: "#modal_registro_usuario",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        posterior_uri: "recurso_natural/lists",
        items: [],
        usuarios: [],
        id_usuario_selected: 0,
        nacionalidad: "",
        confirm_pw: "",
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
        ad: false
    },
    mounted() {
        this.inicializarRecursoNatural();

    },
    methods: {
        setear(items) {
            this.items = items;
        },

        inicializarRecursoNatural() {
            let $this = this;
            fetch(this.uri + this.posterior_uri)
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },

        Registrar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                nombre: this.Usuario.nombre,
                apellido: this.Usuario.apellido,
                cedula: this.nacionalidad + this.Usuario.cedula,
                rol_usuario: this.Usuario.rol,
                status: this.Usuario.status,
                usuario: this.Usuario.usuario,
                contraseña: this.Usuario.password,
                id_recurso_natural: this.Usuario.id_recurso_natural
            };
            if (validate) {
                if (localStorage.token) {
                    this.token = localStorage.token;
                }
                $("#modal_registro_usuario").modal("hide");
                fetch(this.uri + "user/registrar_usuario", {
                        method: "POST", // or 'PUT'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": this.token
                        }
                    })
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.AlertStyle(response.title, response.message, response.status);
                    });
            }
        },
        AlertStyle(titulo, descripcion, icono) {
            swal({
                title: `${titulo}`,
                text: `${descripcion}`,
                icon: `${icono}`,
                buttons: {
                    OK: true,
                },
            }).then((value) => {
                console.log(value)
                if (icono == 'error') {
                    $('#modal_registro_usuario').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if ((this.nacionalidad === '_') || (this.Usuario.cedula === '') || (this.Usuario.nombre === '') || (this.Usuario.apellido === '') ||
                ((this.Usuario.recurso === 'Seleccione') || (this.Usuario.recurso === '')) || (this.Usuario.usuario === '') || (this.Usuario.password === '') || (this.confirm_pw === '') ||
                ((this.Usuario.rol === 'Seleccione') || (this.Usuario.rol === '')) ||
                ((this.Usuario.status === 'Seleccione') || (this.Usuario.status === ''))) {
                this.AlertStyle("¡ATENCIÓN!", "Debe introducir todos los datos solicitados.", "error");

                return false;
            } else {
                if ((this.Usuario.cedula.length < 6) || (this.Usuario.cedula.length > 8)) {
                    $('#cedula').css('border-color', '#FF0000');
                    this.AlertStyle("¡ATENCIÓN!", "El campo cédula debe tener al menos 6 caracteres numéricos", "error");
                    return false;
                } else {
                    $('#cedula').css('border', 'none');
                    if (this.Usuario.password !== this.confirm_pw) {
                        $('#password').css('border-color', '#FF0000');
                        $('#password1').css('border-color', '#FF0000');
                        this.AlertStyle("¡ATENCIÓN!", "Password y confirmación de password no coinciden.", "error");
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        VaciarForm() {
            this.Usuario.nombre = '';
            this.Usuario.apellido = '';
            this.nacionalidad = '';
            this.Usuario.cedula = '';
            this.Usuario.rol = '';
            this.Usuario.status = '';
            this.Usuario.usuario = '';
            this.Usuario.password = '';
            this.Usuario.id_recurso_natural = 0;
            this.confirm_pw = '';
        },
        onChange(event) {
            if (event.target.value == "Administrador") {
                this.ad = true;
                this.Usuario.id_recurso_natural = null;
            } else {
                this.ad = false;
            }
        }
    }
});