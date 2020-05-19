var modal_registro_familia = new Vue({
    el: "#modal_registro_familia",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        descripcion: '',
        id_recurso_natural: 0,
        items: []
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
        Registrar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                nombre: this.MayusculaPrimera(this.nombre.toLowerCase()),
                descripcion: this.descripcion,
                tipo_recurso_natural: this.id_recurso_natural

            };
            if (validate) {
                $("#modal_registro_familia").modal("hide");
                fetch(this.uri + "familia/registrar", {
                        method: "POST", // or 'PUT'
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
                    $('#modal_registro_familia').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.nombre == "") {
                $('#familiaV').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Familia", "error");
                return false;
            } else if (this.descripcion == "") {
                $('#descripcionfv').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Descripcion de Familia", "error");
                return false;
            } else if (this.id_recurso_natural == 0) {
                $('#recursof').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione un Recurso Natural", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.nombre = '';
            this.descripcion = '';
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});