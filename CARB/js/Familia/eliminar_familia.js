var modal_eliminar_familia = new Vue({
    el: "#modal_eliminar_familia",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        items: [],
        id_familia: 0,
        familias: [],
    },
    mounted() {
        this.InicializarFamilias();
    },
    methods: {

        setearFamilias(items) {
            console.log(items)
            this.familias = items;
        },
        InicializarFamilias() {
            let $this = this;
            fetch(this.uri + 'familia/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearFamilias(response.resultado));
        },

        Eliminar() {
            if (this.id_familia > 0) {
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
                this.AlertStyle("ERROR!!", "Seleccione Familia a Eliminar", "error");
            }
        },

        deleteConfirmation() {
            $this = this;
            fetch(`${this.uri}familia/delete/${this.id_familia}`, {
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
                    $('#modal_eliminar_familia').modal('show');
                } else {
                    this.items = [];
                    this.id_familia = 0;
                    $("#modal_eliminar_familia").modal("hide");
                }

            });
        },


    }
});