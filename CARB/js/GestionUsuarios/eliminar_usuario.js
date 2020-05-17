var modal_eliminar_usuario = new Vue({
    el: "#modal_eliminar_usuario",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        usuarios: [],
        id_usuario_selected: 0,
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
        Eliminar() {
            if (this.id_usuario_selected > 0) {
                swal("¡CONFIRMACIÓN", "¿Desea Eliminar el Registro Seleccionado?.", {
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    dangerMode: true,
                    buttons: {
                        cancel: {
                            text: "Cancelar",
                            visible: true,
                            className: " ",
                        },
                        confirm: true,
                    },
                }).then((value) => {
                    console.log(value);
                    if (value == true) {
                        this.deleteConfirmation();
                    }
                });
            } else {
                this.AlertStyle("ERROR!!", "Seleccione Usuario a Eliminar", "error");
            }
        },
        deleteConfirmation() {
            $this = this;
            fetch(`${this.uri}user/delete/${this.id_usuario_selected}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": this.token
                    }
                })
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => {
                    console.log(response)
                    $this.AlertStyle(response.title, response.message, response.status);
                });
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
                    $('#modal_eliminar_usuario').modal('show');
                } else {
                    this.usuarios = [];
                    this.inicializarUsuarios();
                    this.id_usuario_selected = 0;

                }

            });
        },


    }
});