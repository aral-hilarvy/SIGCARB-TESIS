var ecabezado_valor_economico = new Vue({
    el: "#ecabezado_valor_economico",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        numero_encuesta: 0,
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
        comunidad: "",
        tipo_asentamiento: "",
        grupo_etnico: "",
        altitud: '',
        utm: "",
    },
    mounted() {
        this.GetNumEncuesta();
    },
    methods: {
        Asignar(valor) {
            this.numero_encuesta = valor.resultado;
            if (localStorage.id) {
                this.id_usuario = localStorage.id;
                //this.nombre_encuestador = localStorage.nombre + ' ' + localStorage.apellido;
            }
        },
        GetNumEncuesta() {
            let $this = this;
            fetch(this.uri + "encuesta_valor_economico/numero_encuesta")
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.Asignar(response));
        },
        Registrar() {

            let $this = this;
            var data = {
                num_encuesta: this.numero_encuesta,
                fecha: this.fecha,
                hora_inicio: this.hora_inicio,
                hora_fin: this.hora_fin,
                comunidad: this.comunidad,
                tipo_asentamiento: this.tipo_asentamiento,
                grupo_etnico: this.grupo_etnico,
                altitud: this.altitud,
                utm: this.utm,
                encuestador: localStorage.id,

            };

            fetch(this.uri + "encuesta_valor_economico/registrar", {
                    method: "POST", // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => {
                    console.log(response)
                    localStorage.fecha = $this.fecha;
                    localStorage.numero_encuesta = this.numero_encuesta;
                    localStorage.id_encuesta_union = response.resultado.id;
                    localStorage.comunidad = $this.comunidad;
                    localStorage.tipo_asentamiento = $this.tipo_asentamiento;
                    window.location.href = $this.ubicacion + "html_Encuesta_Valor_Economico/Formulario_Encuesta_1_Parte_1_Alimentos.html";
                });
        }

    },
    filters: {
        agregar: function (value) {
            if (!value) return ''
            var str = "" + value
            var pad = "0000"
            var ans = pad.substring(0, pad.length - str.length) + str
            return ans;
        }
    }
});