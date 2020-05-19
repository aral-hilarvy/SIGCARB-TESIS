var modal_editar_datos_usuario = new Vue({
    el: "#modal_editar_datos_usuario",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        usuarios: [],
        id_usuario_selected: 0,
        DataUsuario: {},
        items: [],
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
        password: '',
        repeat_pw: '',
        active: false

    },
    mounted() {
        this.inicializarUsuarios();
        this.inicializarRecursoNatural();
    },
    methods: {

        setearUsuarios(usuarios) {
            console.log(usuarios)
            this.usuarios = usuarios;
        },
        setear(items) {
            this.items = items;
        },

        inicializarRecursoNatural() {
            let $this = this;
            fetch(this.uri + 'recurso_natural/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },

        inicializarUsuarios() {
            if (localStorage.token) {
                this.token = localStorage.token;
            }
            let $this = this;
            fetch(this.uri + 'user/lists', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": this.token
                    }
                })
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearUsuarios(response.usuarios));
        },
        encontrar(usuario) {
            return usuario.id == this.id_usuario_selected;
        },
        SeleccionarUsuario() {
            //alert(this.id_usuario_selected)
            console.log(this.usuarios.find(this.encontrar));
            this.DataUsuario = this.usuarios.find(this.encontrar);

            this.Usuario.cedula = this.DataUsuario.cedula;
            this.Usuario.nombre = this.DataUsuario.nombre;
            this.Usuario.apellido = this.DataUsuario.apellido;
            this.Usuario.id_recurso_natural = this.DataUsuario.id_recurso_natural;
            this.Usuario.usuario = this.DataUsuario.usuario;
            this.Usuario.password = this.DataUsuario.contrasena;
            this.Usuario.rol = this.DataUsuario.rol_usuario;
            this.Usuario.status = this.DataUsuario.status;
            if (this.DataUsuario.rol_usuario == "Administrador") {

                this.active = true;
            } else {
                this.active = false;
            }
        },
        Editar: function () {
            let validate = this.Validar();
            console.log(validate)
            let $this = this;
            let edit_clave;
            let valor_clave = '';
            if (this.password != '' && this.repeat_pw != '') {
                edit_clave = true;
                valor_clave = this.password;
            } else {
                edit_clave = false;
                valor_clave = this.Usuario.password;
            }
            var data = {
                nombre: this.Usuario.nombre,
                apellido: this.Usuario.apellido,
                cedula: this.Usuario.cedula,
                rol_usuario: this.Usuario.rol,
                status: this.Usuario.status,
                usuario: this.Usuario.usuario,
                contraseña: valor_clave,
                id_recurso_natural: this.Usuario.id_recurso_natural,
                edit_contraseña: edit_clave
            };

            if (validate) {
                if (localStorage.token) {
                    this.token = localStorage.token;
                }
                $("#modal_editar_datos_usuario").modal("hide");
                fetch(`${this.uri}user/update/${this.id_usuario_selected}`, {
                        method: "PUT", // or 'PUT'
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
                    $('#modal_editar_datos_usuario').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            //console.log(this.nacionalidad)
            if ((this.Usuario.id_recurso_natural == '') || (this.Usuario.usuario == '') || (this.Usuario.rol === '') || (this.Usuario.status === '') || (this.password != '' && this.repeat_pw == '') || (this.password == '' && this.repeat_pw != '')) {
                this.AlertStyle("¡ATENCIÓN!", "Debe introducir todos los datos solicitados.", "error");
                return false;
            } else if (this.password != this.repeat_pw) {
                $('#passwordEDU').css('border-color', '#FF0000');
                $('#password1EDU').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Los campos Password y Confirmar Password deben coincidir", "error");
                return false;
            } else {
                $('#passwordEDU').css('border-color', '#00FF00');
                $('#password1EDU').css('border-color', '#00FF00');
                $('#usuarioEDU').css('border-color', '#00FF00');
                return true;
            }
        },
        VaciarForm() {
            this.Usuario.nombre = '';
            this.Usuario.apellido = '';
            this.Usuario.cedula = '';
            this.Usuario.rol = '';
            this.Usuario.status = '';
            this.Usuario.usuario = '';
            this.Usuario.password = '';
            this.Usuario.id_recurso_natural = 0;
            this.password = '';
            this.repeat_pw = '';

            this.usuarios = [];
            this.inicializarUsuarios();
            this.id_usuario_selected = 0;
            this.inicializarRecursoNatural();
        }
    }
});