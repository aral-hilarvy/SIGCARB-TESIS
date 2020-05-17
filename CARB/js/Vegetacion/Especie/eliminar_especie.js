var modal_eliminar_especie_veg = new Vue({
    el: "#modal_eliminar_especie_veg",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        id_especie: 0,
        especies: [],
    },
    mounted() {
        this.InicializarEpecies();
    },
    methods: {

        setearGeneros(items) {
            console.log(items)
            this.especies = items;
        },
        InicializarEpecies() {
            let $this = this;
            fetch(this.uri + 'especief/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearGeneros(response.resultado));
        },

        Eliminar() {
            if (this.id_especie > 0) {
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
                this.AlertStyle("ERROR!!", "Seleccione Especie a Eliminar", "error");
            }
        },

        deleteConfirmation() {
            $this = this;
            fetch(`${this.uri}especief/delete/${this.id_especie}`, {
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
                    $('#modal_eliminar_especie_veg').modal('show');
                } else {
                    this.id_especie = 0;
                    $("#modal_eliminar_especie_veg").modal("hide");
                }

            });
        },


    }
});