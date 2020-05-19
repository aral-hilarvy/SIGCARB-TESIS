var Edittar_Grupo_Funcional = new Vue({
    el: "#Edittar_Grupo_Funcional",
    data: {
        uri: "http://localhost:3978/api/",
        id_usuario: "",
        token: '',
        especie_vegetacion: null,
        id_especie: 0,
        periocidad_hoja: '',
        estado_sucesional: '',
        dispercion: '',
        ubicacion: '',
        nro_coleccion: 1,
        grupo_funcional: null,

    },
    mounted() {
        this.GetEspecieVegetacion();
        this.ConteoNumeroCol();
    },
    methods: {
        IniContador(response) {
            console.log(response);
            this.grupo_funcional = response.resultado;

            this.id_especie = response.resultado.id_especie_flora;
            this.periocidad_hoja = response.resultado.periocidad_hoja;
            this.estado_sucesional = response.resultado.estado_sucesional;
            this.dispercion = response.resultado.sindrome_dispersion.split(",");
            this.ubicacion = response.resultado.descripcion_ubicacion;
            this.nro_coleccion = response.resultado.nro_coleccion;
            console.log(this.dispercion)

        },
        ConteoNumeroCol() {
            let $this = this;
            if (localStorage.id_EDGrupoFuncional) {
                fetch(this.uri + "grupo_funcional/list/" + localStorage.id_EDGrupoFuncional)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.IniContador(response);
                    });
            }

        },
        IniEspecieVeg(response) {
            console.log(response);
            this.especie_vegetacion = response.resultado;
        },
        GetEspecieVegetacion() {
            let $this = this;
            fetch(this.uri + "especief/lists")
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => {
                    $this.IniEspecieVeg(response);
                });
        },
        Editar: function () {
            let $this = this;
            let validate = this.Validar()
            if (validate) {
                data = {
                    id_especie_flora: this.id_especie,
                    sindrome_dispersion: this.dispercion.toString(),
                    estado_sucesional: this.estado_sucesional,
                    periocidad_hoja: this.periocidad_hoja,
                    nro_coleccion: this.nro_coleccion,
                    descripcion_ubicacion: this.ubicacion
                }
                console.log(data)
                fetch(this.uri + "grupo_funcional/update/" + localStorage.id_EDGrupoFuncional, {
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
                    OK: true
                }
            }).then(value => {

                if (icono == "error") {
                    console.log(value);
                } else {
                    window.location.href = 'indexUsuarioComun.html'
                }
            });
        },
        Validar() {
            if (this.id_especie < 1) {
                $("#especie_1").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Especie", "error");
                return false;
            } else if (this.periocidad_hoja == '') {
                $("#periocidad_1").css("border-color", "#FF0000");
                $("#especie_1").css("border-color", "#6CAAE8");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Periocidad", "error");
                return false;
            } else if (this.estado_suc == '') {
                $("#estado_suc_1").css("border-color", "#FF0000");
                $("#periocidad_1").css("border-color", "#6CAAE8");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione  Estado Sucesional", "error");
                return false;
            } else if (this.dispercion == '') {
                $("#dispersion_1").css("border-color", "#FF0000");
                $("#estado_suc_1").css("border-color", "#6CAAE8");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Dispersion", "error");
                return false;
            } else if (this.ubicacion == '') {
                $("#ubicacion_1").css("border-color", "#FF0000");
                $("#dispersion_1").css("border-color", "#6CAAE8");
                this.AlertStyle("¡ATENCIÓN!", "Ingrese Ubicacion", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {
            this.id_especie = 0;
            this.dispercion = "";
            this.estado_sucesional = "";
            this.periocidad_hoja = "";
            this.ubicacion = "";
        }
    },
    filters: {
        agregar: function (value) {
            if (!value) return ''
            var str = "" + value
            var pad = "0000"
            var ans = pad.substring(0, pad.length - str.length) + str
            // value = value.toString()
            return ans;
        }
    }
});