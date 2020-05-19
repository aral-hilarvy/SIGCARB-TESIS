var modal_editar_datosPersonales = new Vue({
    el: "#modal_editar_datosPersonales",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        usuarios: [],
        id_usuario_selected: 0,
        nacionalidad: "",
        DataPersonal: {},
        cedula: '',
        nombre: '',
        apellido: '',
        token: ''
    },
    mounted() {
        this.inicializarUsuarios();
    },
    methods: {

        setearUsuarios(usuarios) {
            console.log(usuarios)
            this.usuarios = usuarios;
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
            this.DataPersonal = this.usuarios.find(this.encontrar);
            this.cedula = this.DataPersonal.cedula.substr(1);
            this.nacionalidad = this.DataPersonal.cedula.substr(-20, 1);
            this.nombre = this.DataPersonal.nombre;
            this.apellido = this.DataPersonal.apellido;
        },
        Editar: function () {
            let validate = this.Validar();
            console.log(validate)
            let $this = this;
            var data = {
                nombre: this.nombre,
                apellido: this.apellido,
                cedula: this.nacionalidad + this.cedula,
                rol_usuario: this.DataPersonal.rol_usuario,
                status: this.DataPersonal.status,
                usuario: this.DataPersonal.usuario,
                contraseña: this.DataPersonal.contrasena,
                id_recurso_natural: this.DataPersonal.id_recurso_natural,
                edit_contraseña: false
            };

            if (validate) {
                if (localStorage.token) {
                    this.token = localStorage.token;
                }
                $("#modal_editar_datosPersonales").modal("hide");
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
                    $('#modal_editar_datosPersonales').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            //console.log(this.nacionalidad)
            if (((this.nacionalidad == '_') || (this.nacionalidad == '') || isNaN(this.nacionalidad) == false) || (this.cedula === '') || (this.nombre === '') || (this.apellido === '')) {
                this.AlertStyle("¡ATENCIÓN!", "Debe introducir todos los datos solicitados.", "error");
                return false;
            } else if ((this.cedula.length < 6) || (this.cedula.length > 8)) {
                $('#cedulaEDP').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "El campo cédula debe tener al menos 6 caracteres numéricos", "error");
                return false;
            } else {
                $('#cedulaEDP').css('border-color', '#00FF00');
                $('#nombreEDP').css('border-color', '#00FF00');
                $('#apellidoEDP').css('border-color', '#00FF00');
                return true;
            }
        },
        VaciarForm() {
            this.nombre = '';
            this.apellido = '';
            this.nacionalidad = '';
            this.cedula = '';
            this.usuarios = [];
            this.inicializarUsuarios();
            this.id_usuario_selected = 0;
        }
    }
});