var modal_registro_tipoMuestreo = new Vue({
    el: "#modal_registro_tipoMuestreo",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: ''
    },
    mounted() {},
    methods: {
        Registrar: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                nombre: this.MayusculaPrimera(this.nombre.toLowerCase())
            };
            if (validate) {
                $("#modal_registro_tipoMuestreo").modal("hide");
                fetch(this.uri + "tipo_muestreo/registrar", {
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
                    $('#modal_registro_tipoMuestreo').modal('show');
                } else {
                    this.VaciarForm();
                }

            });
        },
        Validar() {
            if (this.nombre == "") {
                $('#TipoMuestreo').css('border-color', '#FF0000');
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Nombre de Tipo Muestreo", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.nombre = '';
        },
        MayusculaPrimera(recurso) {
            return recurso.charAt(0).toUpperCase() + recurso.slice(1);
        }
    }
});