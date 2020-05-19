var modal_eliminar_EspacioMuestreo = new Vue({
    el: "#modal_eliminar_EspacioMuestreo",
    data: {
        uri: "http://localhost:3978/api/",
        id_usuario: "",
        tipo_bosque: "",
        cod_espacio_muestreo: "",
        numeral: 0,
        t_bosque: "",
        espacio_muestreos: [],
        id_Espaciomuestreo: 0
    },
    mounted() {
        this.initRegistros();

    },
    methods: {
        setear(registros) {
            console.log(registros)
            this.espacio_muestreos = registros.resultado;
        },
        initRegistros() {
            if (localStorage.id) {
                this.id_usuario = localStorage.id;
            }
            let $this = this;
            fetch(this.uri + "tipo_muestreo/list/" + this.id_usuario)
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response));
        },
        Eliminar_Esp_Mues: function () {
            let validate = this.Validar();
            let $this = this;
            if (validate) {
                $("#modal_eliminar_EspacioMuestreo").modal("hide");
                fetch(this.uri + "tipo_muestreo/delete/" + this.id_Espaciomuestreo, {
                        method: "DELETE"
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
                    OK: true
                }
            }).then(value => {
                console.log(value);
                if (icono == "error") {
                    $("#modal_eliminar_EspacioMuestreo").modal("show");
                } else {
                    this.VaciarForm();
                }
            });
        },
        Validar() {
            if (this.id_Espaciomuestreo == 0) {
                $("#Eli_EspacioMuestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Espacio Muestreo", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.id_Espaciomuestreo = 0;
            $("#Eli_EspacioMuestreo").css("border-color", "#DDDDDE");
        }
    }
});