var modal_registro_genero = new Vue({
    el: "#modal_registro_genero",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        id_familia: 0,
        nombre: '',
        descripcion: '',
        familias: []
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
        Registrar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                nombre: this.MayusculaPrimera(this.nombre.toLowerCase()),
                descripcion: this.descripcion,
                id_familia: this.id_familia

            };
            if (validate) {
                $("#modal_registro_genero").modal("hide");
                fetch(this.uri + "genero/registrar", {
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
                    $('#modal_registro_genero').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.nombre == "") {
                $('#genero').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Genero", "error");
                return false;
            } else if (this.descripcion == "") {
                $('#descripciong').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Descripcion de Genero", "error");
                return false;
            } else if (this.id_familia == 0) {
                $('#familiag').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione una Familia", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.nombre = '';
            this.descripcion = '';
            this.id_familia = '';
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});