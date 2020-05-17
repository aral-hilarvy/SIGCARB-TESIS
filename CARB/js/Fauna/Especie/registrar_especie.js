var modal_registro_especie_fau = new Vue({
    el: "#modal_registro_especie_fau",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        descripcion: '',
        id_genero: 0,
        generos: [],
        Especie: {
            id_genero: 0,
            nombre_especie: '',
            nombre_comun: '',
            nombre_cientifico: '',
            descripcion: ''
        }
    },
    mounted() {
        this.inicializarGenero();
    },

    methods: {
        setear(generos) {
            this.generos = generos;
        },
        inicializarGenero() {
            let $this = this;
            fetch(this.uri + 'genero/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },
        Registrar: function () {
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
                $("#modal_registro_especie_fau").modal("hide");
                fetch(this.uri + "especie_fauna/registrar", {
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
                    $('#modal_registro_especie_fau').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.Especie.id_genero == 0) {
                $('#generoef').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Genero", "error");
                return false;
            } else if (this.Especie.nombre_especie == "") {
                $('#especief').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Especie", "error");
                return false;
            } else if (this.Especie.nombre_comun == "") {
                $('#NomComunF').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre Comun de Especie", "error");
                return false;
            } else if (this.Especie.nombre_cientifico == "") {
                $('#NomCienF').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre Cientifico de Especie", "error");
                return false;
            } else if (this.Especie.descripcion == '') {
                $('#descripcionef').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Descripcion de Especie", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
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