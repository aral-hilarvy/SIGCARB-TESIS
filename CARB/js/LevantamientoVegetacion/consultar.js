var Consultar_Levantamiento_Flora = new Vue({
    el: "#Consultar_Levantamiento_Flora",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: window.location.href.split("/").slice(0, window.location.href.split("/").length-2).join('/')+'/',
        Encab_Levant_Flora: {
            id: 0,
            localidad: "",
            uso_asociado: "",
            fecha: "",
            tipo_perturbacion: "",
            tipo_bosque: "",
            tipo_muestreo: "",
            direccion_transecta: "",
            latitud: "",
            longitud: "",
            pendiente_general: 0,
            nro_levantamiento: 1,
            id_espacio_muestreo: 0,
            ubicacion_punto_muestreo: null,
            responsable: "",
            nro_transecta: 0,
            cod_espacio_muestreo: ""
        },
        band: true,
        especie_vegetacion: null,
        estacion: 1,
        pendiente: 0,
        id_encabezado_levantamiento_flora: 0,
        band_cuad_1: false,
        band_cuad_2: false,
        band_cuad_3: false,
        band_cuad_4: false,
        registros_completos: null,
        min: 0,
        max: 3,
        disable_b: false,
        registros: [{
                id: 0,
                cuadrante: 1,
                nombre_comun: -1,
                dap: 0,
                ht: 0,
                dist: 0,
                ps: "",
                gab_dosel: "",
                observacion: ""
            },
            {
                id: 0,
                cuadrante: 2,
                nombre_comun: -1,
                dap: 0,
                ht: 0,
                dist: 0,
                ps: "",
                gab_dosel: "",
                observacion: ""
            },
            {
                id: 0,
                cuadrante: 3,
                nombre_comun: -1,
                dap: 0,
                ht: 0,
                dist: 0,
                ps: "",
                gab_dosel: "",
                observacion: ""
            },
            {
                id: 0,
                cuadrante: 4,
                nombre_comun: -1,
                dap: 0,
                ht: 0,
                dist: 0,
                ps: "",
                gab_dosel: "",
                observacion: ""
            }
        ]
    },
    mounted() {
        this.initEncabezadoLevantamientoFlora();
        this.GetEspecieVegetacion();
    },
    methods: {
        IniEspecieVeg(response) {
            console.log(response);
            this.especie_vegetacion = response.resultado;
            this.getLevantamiento();
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
        setEspMuestreo(response) {
            console.log(response);
            this.Encab_Levant_Flora.tipo_bosque = response.resultado[0].tipo_bosque;
            this.Encab_Levant_Flora.cod_espacio_muestreo =
                response.resultado[0].cod_espacio_muestreo;
        },
        Asignar(response) {
            console.log(response);
            this.Encab_Levant_Flora.nro_levantamiento =
                response.resultado[0].nro_levantamiento;
            this.Encab_Levant_Flora.responsable = "";
            this.Encab_Levant_Flora.fecha = response.resultado[0].fecha;
            this.Encab_Levant_Flora.localidad = response.resultado[0].localidad;
            this.Encab_Levant_Flora.uso_asociado = response.resultado[0].uso_asociado;
            this.Encab_Levant_Flora.tipo_perturbacion =
                response.resultado[0].tipo_perturbacion;
            this.Encab_Levant_Flora.latitud = response.resultado[0].latitud;
            this.Encab_Levant_Flora.longitud = response.resultado[0].longitud;
            this.Encab_Levant_Flora.tipo_bosque = "";
            this.Encab_Levant_Flora.nro_transecta =
                response.resultado[0].nro_transecta;
            this.Encab_Levant_Flora.direccion_transecta =
                response.resultado[0].direccion_transecta;
            this.Encab_Levant_Flora.pendiente_general =
                response.resultado[0].pendiente_general;
            if (localStorage.nombre) {
                this.Encab_Levant_Flora.responsable = localStorage.nombre;
            }
            console.log(response.resultado[0].id_espacio_muestreo);
            this.GetEspacioMuestreo(response.resultado[0].id_espacio_muestreo);
        },
        initEncabezadoLevantamientoFlora() {
            let $this = this;
            if (localStorage.id_encabezado_levantamiento_flora) {
                fetch(
                        this.uri +
                        "encabezadolf/list/" +
                        localStorage.id_encabezado_levantamiento_flora
                    )
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.Asignar(response);
                    });
            }
        },
        GetEspacioMuestreo(id_espacio_muestreo) {
            let $this = this;
            if (localStorage.id_encabezado_levantamiento_flora) {
                fetch(this.uri + "tipo_muestreo/list_id/" + id_espacio_muestreo)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.setEspMuestreo(response);
                    });
            }
        },

        Consultar: function () {
            this.min = this.min + 4;
            this.max = this.max + 4;
            this.SetGeneral();
        },
        SetGeneral() {

            if (this.registros_completos.length > this.max) {
                for (let i = this.min, u = 0; i <= this.max; i++, u++) {
                    if (this.registros_completos[i].id_especie_flora) {
                        let id_e_f = this.registros_completos[i].id_especie_flora;
                        let arrelgo_item = this.especie_vegetacion.filter(function (el) {
                            return el.id == id_e_f;
                        });

                        this.registros[u].nombre_comun = arrelgo_item[0].nombre_comun;
                        if (i == this.min) this.band_cuad_1 = false;
                        if (i == this.min + 1) this.band_cuad_2 = false;
                        if (i == this.max - 1) this.band_cuad_3 = false;
                        if (i == this.max) this.band_cuad_4 = false;
                    } else {
                        this.registros[u].nombre_comun = "Sin Registro";
                        if (i == this.min) this.band_cuad_1 = true;
                        if (i == this.min + 1) this.band_cuad_2 = true;
                        if (i == this.max - 1) this.band_cuad_3 = true;
                        if (i == this.max) this.band_cuad_4 = true;
                    }
                    this.estacion = this.registros_completos[i].nro_estacion;
                    this.registros[u].id = this.registros_completos[i].id;
                    this.registros[u].cuadrante = this.registros_completos[
                        i
                    ].nro_cuadrante;
                    this.registros[u].dap = this.registros_completos[
                        i
                    ].diametro_altura_pecho;
                    this.registros[u].ht = this.registros_completos[i].altura_maxima;
                    this.registros[u].dist = this.registros_completos[i].distancia;
                    this.registros[u].ps = this.registros_completos[
                        i
                    ].posicion_sociologica;
                    this.registros[u].gab_dosel = this.registros_completos[
                        i
                    ].porcentaje_cobertura_gap_dosel;
                    this.registros[u].observacion = this.registros_completos[
                        i
                    ].descripcion;
                    this.pendiente = this.registros_completos[i].pendiente;
                }
            } else {
                this.disable_b = true;
            }
        },
        setTodo(response) {
            this.registros_completos = response.resultado;
            this.SetGeneral();
            console.log(response);
        },
        getLevantamiento() {
            let $this = this;
            if (localStorage.id_encabezado_levantamiento_flora) {
                fetch(
                        this.uri +
                        "rlf/list/" +
                        localStorage.id_encabezado_levantamiento_flora
                    )
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.setTodo(response);
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
            });
        }
    },
    filters: {
        agregar: function (value) {
            if (!value) return "";
            var str = "" + value;
            var pad = "0000";
            var ans = pad.substring(0, pad.length - str.length) + str;
            // value = value.toString()
            return ans;
        },
        rellenar: function (value) {
            if (!value) return "-";
            return value;
        }
    }
});