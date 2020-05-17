var modal_editar_genero = new Vue({
    el: "#modal_editar_genero",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        descripcion: '',
        id_familia: 0,
        id_genero_selected: 0,
        generos: [],
        familias: [],
        Genero: {
            id: 0,
            nombre: '',
            descripcion: '',
            id_familia: 0
        },
        DataGenero: {},
    },
    mounted() {
        this.inicializarGenero();
        this.InicializarFamilias();
    },


    methods: {
        setear(items) {
            this.generos = items;
        },
        inicializarGenero() {
            let $this = this;
            fetch(this.uri + 'genero/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },
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

        encontrar(generos) {
            return generos.id == this.id_genero_selected;
        },
        SeleccionarGenero() {
            //alert(this.id_familia_selected)
            console.log(this.generos.find(this.encontrar));
            this.DataGenero = this.generos.find(this.encontrar);
            this.Genero.id = this.DataGenero.id;
            this.Genero.nombre = this.DataGenero.nombre;
            this.Genero.descripcion = this.DataGenero.descripcion;
            this.Genero.id_familia = this.DataGenero.id_familia;
        },

        Editar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                nombre: this.MayusculaPrimera(this.Genero.nombre.toLowerCase()),
                descripcion: this.Genero.descripcion,
                id_familia: this.Genero.id_familia
            };
            if (validate) {
                $("#modal_editar_genero").modal("hide");
                fetch(`${this.uri}genero/update/${this.Genero.id}`, {
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
                    $('#modal_editar_genero').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.Genero.id == 0) {
                $('#ED_genero').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Genero a Editar", "error");
                return false;
            } else if (this.Genero.nombre == "") {
                $('#Egenero').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Genero", "error");
                return false;
            } else if (this.Genero.descripcion == "") {
                $('#Edescripciong').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Descripcion de Genero", "error");
                return false;
            } else if (this.Genero.id_familia == 0) {
                $('#Efamiliag').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione una Familia", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.Genero.id = 0;
            this.Genero.nombre = '';
            this.Genero.descripcion = '';
            this.Genero.id_familia = 0;
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});