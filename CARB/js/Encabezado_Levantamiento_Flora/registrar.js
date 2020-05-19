var Encabezado_Levantamiento_Flora = new Vue({
    el: "#Encabezado_Levantamiento_Flora",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        esp_muestreo: null,
        id_usuario: "",
        token: '',
        localidad: '',
        uso_asociado: '',
        fecha: '',
        tipo_perturbacion: '',
        tipo_bosque: '',
        tipo_muestreo: '',
        direccion_transecta: '',
        latitud: '',
        longitud: '',
        pendiente_general: 0,
        nro_levantamiento: 1,
        id_espacio_muestreo: 0,
        ubicacion_punto_muestreo: null,
        descripcion: '',
        band: true,
        e_m: null,
        deta: null,
        cant_transectas: 0
    },
    mounted() {
        this.initEspMuest();
        //this.initEncabezadoLevantamientoFlora();
    },
    methods: {

        Asignar(response) {
            this.esp_muestreo = response.resultado;
            this.initEncabezadoLevantamientoFlora();
        },
        initEspMuest() {
            if (localStorage.id) {
                this.id_usuario = localStorage.id;
            }
            let $this = this;
            fetch(this.uri + "tipo_muestreo/list/" + this.id_usuario)
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.Asignar(response));
        },
        initEncabezadoLevantamientoFlora() {
            if (localStorage.id) {
                this.id_usuario = localStorage.id;
                this.token = localStorage.token;
            }
            let $this = this;
            fetch(this.uri + "user/list/" + this.id_usuario, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.token
                    }
                })
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.Contador(response));

        },
        Contador(response) {
            this.nro_levantamiento = response.usuario.cant_levantamientos + 1;
            this.deta = {
                cant_levantamientos: response.usuario.cant_levantamientos + 1
            }
        },

        Registrar_Esp_Mues: function () {
            let validate = this.Validar();
            let $this = this;
            var data = {
                id_espacio_muestreo: this.tipo_muestreo,
                nro_levantamiento: this.nro_levantamiento,
                fecha: this.fecha,
                localidad: this.localidad,
                uso_asociado: this.uso_asociado,
                pendiente_general: this.pendiente_general,
                tipo_perturbacion: this.tipo_perturbacion,
                direccion_transecta: this.direccion_transecta,
                latitud: this.latitud,
                longitud: this.longitud,
                nro_transecta: this.cant_transectas,
            };
            console.log(data);
            if (validate) {

                fetch(this.uri + "encabezadolf/registrar", {
                        method: "POST", // or 'PUT'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => {
                        localStorage.id_encabezado_levantamiento_flora = response.resultado.id;

                        fetch(`${this.uri}user/update_levantamientos/${this.id_usuario}`, {
                                method: "PUT", // or 'PUT'
                                body: JSON.stringify(this.deta), // data can be `string` or {object}!
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": this.token
                                }
                            })
                            .then(res => res.json())
                            .catch(error => console.error("Error:", error))
                            .then(response => {

                                fetch(`${this.uri}tipo_muestreo/update_transectas/${this.tipo_muestreo}`, {
                                        method: "PUT", // or 'PUT'
                                        body: JSON.stringify({
                                            cant_transectas: this.cant_transectas
                                        }), // data can be `string` or {object}!
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": this.token
                                        }
                                    })
                                    .then(res => res.json())
                                    .catch(error => console.error("Error:", error))
                                    .then(response => {
                                        console.log(response);
                                        window.location.href = this.ubicacion + "html_Usuario_Comun/Levantamiento_Vegetacion_Registro.html";
                                    });

                            });


                    });
            }
        },
        AccionTipoBosque() {
            let tb = this.tipo_bosque;
            this.band = false;
            this.e_m = this.esp_muestreo.filter(function (el) {
                return el.tipo_bosque == tb;
            });
            console.log(this.e_m);
            //this.cant_transectas=
        },
        AccionTipoMuestreo() {
            let tb = this.tipo_muestreo;
            let esp_mue = this.esp_muestreo.filter(function (el) {
                return el.id == tb;
            });
            console.log(esp_mue);
            this.cant_transectas = esp_mue[0].cant_transectas + 1;
            //console.log(this.cant_transectas);
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
            if (!this.localidad) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Localidad", "error");
            } else if (!this.uso_asociado) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Uso Asociado", "error");
                return false;
            } else if (!this.fecha) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Fecha", "error");
                return false;
            } else if (!this.tipo_perturbacion) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Tipo Perturbacion", "error");
                return false;
            } else if (!this.tipo_bosque) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Tipo Bosque", "error");
                return false;
            } else if (!this.tipo_muestreo) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Tipo Muestreo", "error");
                return false;
            } else if (!this.direccion_transecta) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Direccion Transecta", "error");
                return false;
            } else if (!this.latitud) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Latitud", "error");
                return false;
            } else if (!this.longitud) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Logitud", "error");
                return false;
            } else if (!this.pendiente_general) {
                $("#Espacio_Muestreo").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Indique Pendiente General", "error");
                return false;
            } else {
                return true;
            }
        },
        VaciarForm() {

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