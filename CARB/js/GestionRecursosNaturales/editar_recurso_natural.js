var modal_editar_recurso = new Vue({
    el: "#modal_editar_recurso",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        nombre: '',
        items: [],
        id_recurso_natural: 0
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

        Editar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                nombre: this.MayusculaPrimera(this.nombre.toLowerCase())
            };
            if (validate) {
                $("#modal_editar_recurso").modal("hide");
                fetch(`${this.uri}recurso_natural/update/${this.id_recurso_natural}`, {
                        method: "PUT", // or 'PUT'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            "Content-Type": "application/json"
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
                    $('#modal_editar_recurso').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.nombre == "") {
                $('#recursoN').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Recurso Natural", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.nombre = '';
            this.items = [];
            this.id_recurso_natural = 0;
            this.inicializarRecursoNatural();
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});