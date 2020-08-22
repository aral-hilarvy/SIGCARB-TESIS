var Editar_Levantamiento_Flora = new Vue({
    el: "#Editar_Levantamiento_Flora",
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
        this.Sig();
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

        EventoSelect1() {
            if (this.registros[0].nombre_comun == 0) {
                this.band_cuad_1 = true;
                this.registros[0].nombre_comun = 0;
                this.registros[0].dap = 0;
                this.registros[0].ht = 0;
                this.registros[0].dist = 0;
                this.registros[0].ps = '';
                this.registros[0].gab_dosel = '';
                this.registros[0].observacion = '';
                $("#nombre_comun_c1").css("border-color", "#DDDDDE");
                $("#dap_c1").css("border-color", "#DDDDDE");
                $("#ht_c1").css("border-color", "#DDDDDE");
                $("#dist_c1").css("border-color", "#DDDDDE");
                $("#ps_c1").css("border-color", "#DDDDDE");
            } else {
                this.band_cuad_1 = false;
                $("#nombre_comun_c1").css("border-color", "#79E86C");
            }
        },
        EventoSelect2() {
            if (this.registros[1].nombre_comun == 0) {
                this.band_cuad_2 = true;
                this.registros[1].nombre_comun = 0;
                this.registros[1].dap = 0;
                this.registros[1].ht = 0;
                this.registros[1].dist = 0;
                this.registros[1].ps = "";
                this.registros[1].gab_dosel = "";
                this.registros[1].observacion = "";
                $("#nombre_comun_c2").css("border-color", "#DDDDDE");
                $("#dap_c2").css("border-color", "#DDDDDE");
                $("#ht_c2").css("border-color", "#DDDDDE");
                $("#dist_c2").css("border-color", "#DDDDDE");
                $("#ps_c2").css("border-color", "#DDDDDE");
            } else {
                this.band_cuad_2 = false;
                $("#nombre_comun_c2").css("border-color", "#79E86C");
            }
        },
        EventoSelect3() {
            if (this.registros[2].nombre_comun == 0) {
                this.band_cuad_3 = true;
                this.registros[2].nombre_comun = 0;
                this.registros[2].dap = 0;
                this.registros[2].ht = 0;
                this.registros[2].dist = 0;
                this.registros[2].ps = "";
                this.registros[2].gab_dosel = "";
                this.registros[2].observacion = "";
                $("#nombre_comun_c3").css("border-color", "#DDDDDE");
                $("#dap_c3").css("border-color", "#DDDDDE");
                $("#ht_c3").css("border-color", "#DDDDDE");
                $("#dist_c3").css("border-color", "#DDDDDE");
                $("#ps_c3").css("border-color", "#DDDDDE");
            } else {
                this.band_cuad_3 = false;
                $("#nombre_comun_c3").css("border-color", "#79E86C");
            }
        },
        EventoSelect4() {
            if (this.registros[3].nombre_comun == 0) {
                this.band_cuad_4 = true;
                this.registros[3].nombre_comun = 0;
                this.registros[3].dap = 0;
                this.registros[3].ht = 0;
                this.registros[3].dist = 0;
                this.registros[3].ps = "";
                this.registros[3].gab_dosel = "";
                this.registros[3].observacion = "";
                $("#nombre_comun_c4").css("border-color", "#DDDDDE");
                $("#dap_c4").css("border-color", "#DDDDDE");
                $("#ht_c4").css("border-color", "#DDDDDE");
                $("#dist_c4").css("border-color", "#DDDDDE");
                $("#ps_c4").css("border-color", "#DDDDDE");
            } else {
                this.band_cuad_4 = false;
                $("#nombre_comun_c4").css("border-color", "#79E86C");
            }
        },

        EditarEstacion: function () {
            let validate = this.Validar();
            let $this = this;

            if (validate) {
                console.log("validado")
                if (
                    this.band_cuad_1 &&
                    this.band_cuad_2 &&
                    this.band_cuad_3 &&
                    this.band_cuad_4
                ) {
                    this.pendiente = 0;
                    this.AlertStyle(
                        "¡ATENCIÓN!",
                        "Intenta Enviar un Formulario Vacio",
                        "error"
                    );
                } else {
                    this.min = this.min + 4;
                    this.max = this.max + 4;

                    for (let i = 0; i < this.registros.length; i++) {

                        let id_especie_f;
                        if (this.registros[i].nombre_comun == 0) {
                            id_especie_f = null;
                        } else {
                            id_especie_f = this.registros[i].nombre_comun;
                        }
                        var data = {
                            id: this.registros[i].id,
                            id_encabezado_levantamiento_flora: localStorage.id_encabezado_levantamiento_flora,
                            pendiente: parseInt($this.pendiente, 10),
                            id_especie_flora: id_especie_f,
                            nro_estacion: $this.estacion,
                            nro_cuadrante: this.registros[i].cuadrante,
                            diametro_altura_pecho: this.registros[i].dap,
                            altura_maxima: this.registros[i].ht,
                            distancia: this.registros[i].dist,
                            posicion_sociologica: this.registros[i].ps,
                            porcentaje_cobertura_gap_dosel: this.registros[i].gab_dosel,
                            observaciones: this.registros[i].observacion,

                        };
                        console.log(data)
                        fetch("http://localhost:3978/api/rlf/update/" + this.registros[i].id, {
                                method: "PUT",
                                body: JSON.stringify(data),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            .then(res => res.json())
                            .catch(error => console.error("Error:", error))
                            .then(response => {
                                if (i == ($this.registros.length) - 1) {
                                    $this.SetGeneral()
                                }
                            });
                    }

                }
            } else {
                console.log('no paso validacion')
            }
        },
        SetGeneral() {
            if (this.registros_completos.length > this.max) {
                for (let i = this.min, u = 0; i <= this.max; i++, u++) {
                    if (this.registros_completos[i].id_especie_flora) {
                        this.registros[u].nombre_comun = this.registros_completos[i].id_especie_flora;
                        if (i == this.min)
                            this.band_cuad_1 = false;
                        if (i == (this.min + 1))
                            this.band_cuad_2 = false;
                        if (i == (this.max - 1))
                            this.band_cuad_3 = false;
                        if (i == this.max)
                            this.band_cuad_4 = false;
                    } else {
                        this.registros[u].nombre_comun = 0;
                        if (i == this.min)
                            this.band_cuad_1 = true;
                        if (i == (this.min + 1))
                            this.band_cuad_2 = true;
                        if (i == (this.max - 1))
                            this.band_cuad_3 = true;
                        if (i == this.max)
                            this.band_cuad_4 = true;
                    }
                    this.estacion = this.registros_completos[i].nro_estacion;
                    this.registros[u].id = this.registros_completos[i].id;
                    this.registros[u].cuadrante = this.registros_completos[i].nro_cuadrante;
                    this.registros[u].dap = this.registros_completos[i].diametro_altura_pecho;
                    this.registros[u].ht = this.registros_completos[i].altura_maxima;
                    this.registros[u].dist = this.registros_completos[i].distancia;
                    this.registros[u].ps = this.registros_completos[i].posicion_sociologica;
                    this.registros[u].gab_dosel = this.registros_completos[i].porcentaje_cobertura_gap_dosel;
                    this.registros[u].observacion = this.registros_completos[i].descripcion;
                    this.pendiente = this.registros_completos[i].pendiente;
                }
            } else {
                this.disable_b = true;
            }
        },
        setTodo(response) {
            this.registros_completos = response.resultado;
            this.SetGeneral();
            console.log(response)
        },
        getLevantamiento() {
            let $this = this;
            if (localStorage.id_encabezado_levantamiento_flora) {
                fetch(this.uri + "rlf/list/" + localStorage.id_encabezado_levantamiento_flora)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.setTodo(response);
                    });
            }
        },
        Sig() {
            this.ConsultarEstacion();
            for (let y = 0; y < this.registros.length; y++) {
                this.registros[y].nombre_comun = -1;
                this.registros[y].dap = 0;
                this.registros[y].ht = 0;
                this.registros[y].dist = 0;
                this.registros[y].ps = '';
                this.registros[y].gab_dosel = '';
                this.registros[y].observacion = '';
            }
            this.pendiente = '';
            this.band_cuad_1 = false;
            this.band_cuad_2 = false;
            this.band_cuad_3 = false;
            this.band_cuad_4 = false;
        },
        ConsultarEstacion() {
            /*if (localStorage.id_encabezado_levantamiento_flora) {
                let $this = this;
                fetch(this.uri + "rlf/list/" + localStorage.id_encabezado_levantamiento_flora)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        $this.InitNumeroEstacion(response);
                    });
            }*/
        },
        InitNumeroEstacion(response) {
            /*console.log(response.resultado)
            console.log((response.resultado.length / 4) + 1)
            this.estacion = ((response.resultado.length / 4) + 1);
            if (Math.round(((response.resultado.length / 4) + 1)) > 10) {
                window.location.href =
                    this.ubicacion +
                    "html_Usuario_Comun/indexUsuarioComun.html";
            }*/
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
        },
        Validar() {
            if (this.registros[0].nombre_comun < 0) {
                $("#nombre_comun_c1").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Nombre Común", "error");
            } else if (this.registros[0].nombre_comun > 0) {
                if (this.registros[0].dap == 0 || this.registros[0].dap == "") {
                    $("#dap_c1").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Dap", "error");
                    return false;
                } else if (this.registros[0].ht == 0 || this.registros[0].ht == "") {
                    $("#ht_c1").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Ht", "error");
                    return false;
                } else if (
                    this.registros[0].dist == 0 ||
                    this.registros[0].dist == ""
                ) {
                    $("#dist_c1").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Distancia", "error");
                    return false;
                } else if (this.registros[0].ps == 0 || this.registros[0].ps == "") {
                    $("#ps_c1").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique PS", "error");
                    return false;
                }
            } else if (this.registros[1].nombre_comun < 0) {
                $("#nombre_comun_c2").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Nombre Común", "error");
            } else if (this.registros[1].nombre_comun > 0) {
                if (this.registros[1].dap == 0 || this.registros[1].dap == "") {
                    $("#dap_c2").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Dap", "error");
                    return false;
                } else if (this.registros[1].ht == 0 || this.registros[1].ht == "") {
                    $("#ht_c2").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Ht", "error");
                    return false;
                } else if (
                    this.registros[1].dist == 0 ||
                    this.registros[1].dist == ""
                ) {
                    $("#dist_c2").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Distancia", "error");
                    return false;
                } else if (this.registros[1].ps == 0 || this.registros[1].ps == "") {
                    $("#ps_c2").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique PS", "error");
                    return false;
                } else {
                    return true;
                }
            } else if (this.registros[2].nombre_comun < 0) {
                $("#nombre_comun_c3").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Nombre Común", "error");
            } else if (this.registros[2].nombre_comun > 0) {
                if (this.registros[2].dap == 0 || this.registros[2].dap == "") {
                    $("#dap_c3").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Dap", "error");
                    return false;
                } else if (this.registros[2].ht == 0 || this.registros[2].ht == "") {
                    $("#ht_c3").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Ht", "error");
                    return false;
                } else if (
                    this.registros[2].dist == 0 ||
                    this.registros[2].dist == ""
                ) {
                    $("#dist_c3").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Distancia", "error");
                    return false;
                } else if (this.registros[2].ps == 0 || this.registros[2].ps == "") {
                    $("#ps_c3").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique PS", "error");
                    return false;
                } else {
                    return true;
                }
            } else if (this.registros[3].nombre_comun < 0) {
                $("#nombre_comun_c4").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Nombre Común", "error");
            } else if (this.registros[3].nombre_comun > 0) {
                if (this.registros[3].dap == 0 || this.registros[3].dap == "") {
                    $("#dap_c4").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Dap", "error");
                    return false;
                } else if (this.registros[3].ht == 0 || this.registros[3].ht == "") {
                    $("#ht_c4").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Ht", "error");
                    return false;
                } else if (
                    this.registros[3].dist == 0 ||
                    this.registros[3].dist == ""
                ) {
                    $("#dist_c4").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique Distancia", "error");
                    return false;
                } else if (this.registros[3].ps == 0 || this.registros[3].ps == "") {
                    $("#ps_c4").css("border-color", "#FF0000");
                    this.AlertStyle("¡ATENCIÓN!", "Indique PS", "error");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
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