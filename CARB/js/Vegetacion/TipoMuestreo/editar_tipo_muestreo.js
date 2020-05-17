var modal_editar_tipoMuestreo = new Vue({
    el: "#modal_editar_tipoMuestreo",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        nombre: '',
        items: [],
        id_tipo_muestreo: 0
    },
    mounted() {
        this.inicializarTipoMuestreo();
    },
    methods: {
        setear(items) {
            this.items = items;
        },


        inicializarTipoMuestreo() {
            let $this = this;
            fetch(this.uri + 'tipo_muestreo/lists')
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
                $("#modal_editar_tipoMuestreo").modal("hide");
                fetch(`${this.uri}tipo_muestreo/update/${this.id_tipo_muestreo}`, {
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
                    $('#modal_editar_tipoMuestreo').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.nombre == "") {
                $('#EtipoMuestreo').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Tipo Muestreo", "error");
                return false;
            } else if (this.id_tipo_muestreo == 0) {
                $('#ED_tipoMuestreo').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Tipo Muestreo a Editar", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.nombre = '';
            this.items = [];
            this.id_tipo_muestreo = 0;
            this.inicializarTipoMuestreo();
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});