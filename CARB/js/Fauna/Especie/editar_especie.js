var modal_editar_especie_fau = new Vue({
    el: "#modal_editar_especie_fau",
    data: {
        uri: "http://localhost:3978/api/",
        id_genero: 0,
        generos: [],
        especies: [],
        id_especie_selected: 0,
        Especie: {
            id: 0,
            id_genero: 0,
            nombre_especie: '',
            nombre_comun: '',
            nombre_cientifico: '',
            descripcion: ''
        },
        DataEspecie: {},
    },
    mounted() {
        this.inicializarEspecies();
        this.InicializarGeneros();
    },


    methods: {
        setear(generos) {
            this.generos = generos;
        },
        InicializarGeneros() {
            let $this = this;
            fetch(this.uri + 'genero/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },
        setearEspecies(items) {
            console.log(items)
            this.especies = items;
        },
        inicializarEspecies() {
            let $this = this;
            fetch(this.uri + 'especie_fauna/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearEspecies(response.resultado));
        },

        encontrar(especie) {
            return especie.id == this.id_especie_selected;
        },
        SeleccionarEspecie() {
            //console.log(this.familias.find(this.encontrar));
            this.DataEspecie = this.especies.find(this.encontrar);
            this.Especie.id = this.DataEspecie.id;
            this.Especie.id_genero = this.DataEspecie.id_genero;
            this.Especie.nombre_especie = this.DataEspecie.nombre_especie;
            this.Especie.nombre_comun = this.DataEspecie.nombre_comun;
            this.Especie.nombre_cientifico = this.DataEspecie.nombre_cientifico;
            this.Especie.descripcion = this.DataEspecie.descripcion;
        },

        Editar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                id_genero: this.Especie.id_genero,
                nombre_especie: this.MayusculaPrimera(this.Especie.nombre_especie.toLowerCase()),
                nombre_comun: this.MayusculaPrimera(this.Especie.nombre_comun.toLowerCase()),
                nombre_cientifico: this.MayusculaPrimera(this.Especie.nombre_cientifico.toLowerCase()),
                descripcion: this.Especie.descripcion
            };
            if (validate) {
                $("#modal_editar_especie_fau").modal("hide");
                fetch(`${this.uri}especie_fauna/update/${this.id_especie_selected}`, {
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
                    $('#modal_editar_especie_fau').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.Especie.id_genero == "") {
                $('#Egeneroef').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Genero", "error");
                return false;
            } else if (this.Especie.nombre_especie == "") {
                $('#Eespecief').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Especie", "error");
                return false;
            } else if (this.Especie.nombre_comun == "") {
                $('#ENomComunF').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre Comun de Especie", "error");
                return false;
            } else if (this.Especie.nombre_cientifico == "") {
                $('#ENomCienF').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre Cientifico de Especie", "error");
                return false;
            } else if (this.Especie.descripcion == 0) {
                $('#Edescripcionef').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Descripcion de Especie", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.id_especie_selected = 0;
            this.Especie.id = 0;
            this.Especie.id_genero = 0;
            this.Especie.nombre_especie = '';
            this.Especie.nombre_comun = '';
            this.Especie.nombre_cientifico = '';
            this.Especie.descripcion = '';
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});