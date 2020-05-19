var modal_eliminar_tipoMuestreo = new Vue({
    el: "#modal_eliminar_tipoMuestreo",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        items: [],
        id_tipo_muestreo: 0,
    },
    mounted() {
        this.inicializarTipoMuestreo();
    },
    methods: {

        setear(items) {
            console.log(items)
            this.items = items;
        },


        inicializarTipoMuestreo() {
            let $this = this;
            fetch(this.uri + 'tipo_muestreo/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },

        Eliminar() {
            if (this.id_tipo_muestreo > 0) {
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
                this.AlertStyle("ERROR!!", "Seleccione Tipo Muestreo a Eliminar", "error");
            }
        },

        deleteConfirmation() {
            $this = this;
            fetch(`${this.uri}tipo_muestreo/delete/${this.id_tipo_muestreo}`, {
                    method: "DELETE"
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
                    $('#modal_eliminar_tipoMuestreo').modal('show');
                } else {
                    this.items = [];
                    this.inicializarTipoMuestreo();
                    this.id_tipo_muestreo = 0;

                }

            });
        },


    }
});