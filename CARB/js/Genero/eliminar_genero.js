var modal_eliminar_genero = new Vue({
    el: "#modal_eliminar_genero",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        items: [],
        id_genero: 0,
        generos: [],
    },
    mounted() {
        this.InicializarGeneros();
    },
    methods: {

        setearGeneros(items) {
            console.log(items)
            this.generos = items;
        },
        InicializarGeneros() {
            let $this = this;
            fetch(this.uri + 'genero/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearGeneros(response.resultado));
        },

        Eliminar() {
            if (this.id_genero > 0) {
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
                this.AlertStyle("ERROR!!", "Seleccione Genero a Eliminar", "error");
            }
        },

        deleteConfirmation() {
            $this = this;
            fetch(`${this.uri}genero/delete/${this.id_genero}`, {
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
                    $('#modal_eliminar_genero').modal('show');
                } else {
                    this.id_genero = 0;
                    $("#modal_eliminar_genero").modal("hide");
                }

            });
        },


    }
});