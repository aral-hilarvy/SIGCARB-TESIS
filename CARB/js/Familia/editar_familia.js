var modal_editar_familia = new Vue({
    el: "#modal_editar_familia",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        descripcion: '',
        id_recurso_natural: 0,
        items: [],
        familias: [],
        id_familia_selected: 0,
        Familia: {
            id: 0,
            nombre: '',
            descripcion: '',
            id_tipo_recurso_natural: 0
        },
        DataFamilia: {},
    },
    mounted() {
        this.inicializarRecursoNatural();
        this.InicializarFamilias();
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

        encontrar(familias) {
            return familias.id == this.id_familia_selected;
        },
        SeleccionarFamilia() {
            //alert(this.id_familia_selected)
            console.log(this.familias.find(this.encontrar));
            this.DataFamilia = this.familias.find(this.encontrar);
            this.Familia.id = this.DataFamilia.id;
            this.Familia.nombre = this.DataFamilia.nombre;
            this.Familia.descripcion = this.DataFamilia.descripcion;
            this.Familia.id_tipo_recurso_natural = this.DataFamilia.tipo_recurso_natural;
        },

        Editar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                nombre: this.MayusculaPrimera(this.Familia.nombre.toLowerCase()),
                descripcion: this.Familia.descripcion,
                tipo_recurso_natural: this.Familia.id_tipo_recurso_natural
            };
            if (validate) {
                $("#modal_editar_familia").modal("hide");
                fetch(`${this.uri}familia/update/${this.Familia.id}`, {
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
                    $('#modal_editar_familia').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.Familia.nombre == "") {
                $('#Efamilia').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Familia", "error");
                return false;
            } else if (this.Familia.descripcion == "") {
                $('#Edescripcionf').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Descripcion de Familia", "error");
                return false;
            } else if (this.Familia.id_recurso_natural == 0) {
                $('#Erecursof').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione un Recurso Natural", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.Familia.id = '';
            this.Familia.nombre = '';
            this.Familia.descripcion = '';
            this.Familia.id_tipo_recurso_natural = '';
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});