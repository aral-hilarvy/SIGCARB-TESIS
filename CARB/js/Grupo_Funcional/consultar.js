var Consultar_Grupo_Funcional = new Vue({
    el: "#Consultar_Grupo_Funcional",
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
        nombre_esp: ''
    },
    mounted() {
        this.GetEspecieVegetacion();

    },
    methods: {
        IniContador(response) {
            console.log(response);
            this.grupo_funcional = response.resultado;

            this.id_especie = response.resultado.id_especie_flora;
            this.periocidad_hoja = response.resultado.periocidad_hoja;
            this.estado_sucesional = response.resultado.estado_sucesional;
            this.dispercion = response.resultado.sindrome_dispersion;
            this.ubicacion = response.resultado.descripcion_ubicacion;
            this.nro_coleccion = response.resultado.nro_coleccion;
            console.log(this.dispercion)
            let arrelgo_item = this.especie_vegetacion.filter(function (el) {
                return el.id == response.resultado.id_especie_flora;
            });
            this.nombre_esp = arrelgo_item[0].nombre_comun;

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
            this.ConteoNumeroCol();
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