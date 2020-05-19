var modal_eliminar_recurso = new Vue({
    el: "#modal_eliminar_recurso",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        items: [],
        id_recurso_natural: 0,
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
            fetch(this.uri + 'recurso_natural/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },

        Eliminar() {
            if (this.id_recurso_natural > 0) {
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
                this.AlertStyle("ERROR!!", "Seleccione Recurso Natural a Eliminar", "error");
            }
        },

        deleteConfirmation() {
            $this = this;
            fetch(`${this.uri}recurso_natural/delete/${this.id_recurso_natural}`, {
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
                    $('#modal_eliminar_recurso').modal('show');
                } else {
                    this.items = [];
                    this.inicializarRecursoNatural();
                    this.id_recurso_natural = 0;

                }

            });
        },


    }
});