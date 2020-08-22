var info_Complementaria = new Vue({
    el: "#info_Complementaria",
    data: {
        uri: "http://localhost:3978/api/",
        id_usuario: "",
        token: '',
        InfoCompl: null,
        InfoCompR: null,
        ObjectUnico: {
            id: '',
            id_usuario: 0,
            nombre_imagen: '',
            año: '',
            descripcion_imagen: '',
            image: null
        },
        id_eliminacion: '',
        accion: ''
    },
    mounted() {
        //console.log(localStorage.usuario_invitado)
        if (localStorage.usuario_invitado == 'true') {
            this.getInitInfoComplementariaRecurso();
        } else {
            this.getInitInfoComplementariaUser();
        }
    },
    methods: {

        getInitInfoComplementariaUser() {
            let $this = this;
            if (localStorage.id) {
                fetch(this.uri + "img/list_user/" + localStorage.id)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.IniObject(response);
                    });
            }
        },
        IniObject(object) {
            this.InfoCompl = object.resultado;
        },
        getInitInfoComplementariaRecurso() {

            let $this = this;
            if (localStorage.id_recurso_natural) {
                fetch(this.uri + "img/list_recurso/" + localStorage.id_recurso_natural)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.IniObjectrecurso(response);
                    });
            }
        },

        IniObjectrecurso(object) {
            this.InfoCompR = object.resultado;
        },
        levantarModalRegistro() {
            $('#modal_registro_EspacioMuestreo').modal('show'); // abrir
            this.accion = 'REGISTRAR';
        },
        IniObjectEdit(object) {
            console.log(object.resultado)
            this.ObjectUnico.id_usuario = object.resultado.id_usuario;
            this.ObjectUnico.nombre_imagen = object.resultado.nombre_imagen;
            this.ObjectUnico.año = object.resultado.año;
            this.ObjectUnico.descripcion_imagen = object.resultado.descripcion_imagen;
            this.ObjectUnico.identificador = object.resultado.identificador;
            this.ObjectUnico.id = object.resultado.id;
            this.accion = 'EDITAR';
            $('#modal_registro_EspacioMuestreo').modal('show'); // abrir
        },
        handleFileUpload() {
            this.ObjectUnico.image = this.$refs.image.files[0];
        },
        VaciarObjeto() {
            this.ObjectUnico.id_usuario = 0;
            this.ObjectUnico.nombre_imagen = '';
            this.ObjectUnico.año = '';
            this.ObjectUnico.descripcion_imagen = '';
            this.ObjectUnico.identificador = '';
            this.ObjectUnico.id = '';
        },
        Envio() {
            let $this = this;
            if (this.ObjectUnico.id == '') {
                let formData = new FormData();
                formData.append('image', this.ObjectUnico.image);
                formData.append('id_usuario', localStorage.id);
                formData.append('nombre_imagen', this.ObjectUnico.nombre_imagen);
                formData.append('año', this.ObjectUnico.año);
                formData.append('descripcion_imagen', this.ObjectUnico.descripcion_imagen);

                fetch(this.uri + "img/registrar", {
                        method: "POST", // or 'PUT'
                        body: formData, // data can be `string` or {object}!

                    })
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        console.log(response);
                        $this.getInitInfoComplementariaUser();
                        //$this.AlertStyle(response.title, response.message, response.status);
                    });
            } else {
                let formData = new FormData();
                formData.append('image', this.ObjectUnico.image);
                formData.append('id_usuario', localStorage.id);
                formData.append('nombre_imagen', this.ObjectUnico.nombre_imagen);
                formData.append('año', this.ObjectUnico.año);
                formData.append('descripcion_imagen', this.ObjectUnico.descripcion_imagen);

                fetch(this.uri + "img/update/" + this.ObjectUnico.id, {
                        method: "PUT", // or 'PUT'
                        body: formData, // data can be `string` or {object}!

                    })
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        console.log(response);
                        $this.getInitInfoComplementariaUser();

                        //$this.AlertStyle(response.title, response.message, response.status);
                    });
            }
            this.VaciarObjeto();

        },

        MostrarUpdate(id) {
            let $this = this;
            if (localStorage.id) {
                fetch(this.uri + "img/list/" + id)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.IniObjectEdit(response);
                    });
            }
        },

        Eliminar(id) {
            this.id_eliminacion = id;
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

        },
        deleteConfirmation() {
            $this = this;
            fetch(`${this.uri}img/delete/${this.id_eliminacion}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => {
                    console.log(response)
                    $("#modal_registro_EspacioMuestreo").modal("hide");
                    $this.AlertStyle('¡ÉXITO!', 'Imagen Eliminada Con Éxito', 'success');
                });
        },
        AlertStyle(titulo, descripcion, icono) {
            $this = this;
            swal({
                title: `${titulo}`,
                text: `${descripcion}`,
                icon: `${icono}`,
                buttons: {
                    OK: true
                }
            }).then(value => {
                $this.getInitInfoComplementariaUser();
            });
        },
        NameCompleto(identificador) {
            return 'http://localhost:3978/images/' + identificador;
        },
        MostrarImg(identificador) {
            window.open('http://localhost:3978/images/' + identificador, '_blank');
        },
        desc(descripcion) {
            return descripcion;
        }
    }

});