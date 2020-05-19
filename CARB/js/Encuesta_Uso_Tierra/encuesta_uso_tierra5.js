var formularioQuintoUsoTierra = new Vue({
    el: "#formularioQuintoUsoTierra",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        numero_encuesta: 0,
        fecha: "",
        latitud: "",
        longitud: "",
        id_usuario: "",
        respuesta_cambio: [ //se toma en cuenta si la opcion es "SI"
            { //opcion con if
                id_pregunta: 60,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 60,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
        ],
        respuestas: [{
                id_pregunta: 59,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            { //if potencial
                id_pregunta: 60,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 61,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 62,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 63,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 63,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 64,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 65,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 65,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 66,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 67,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 68,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 68,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
        ],
    },
    mounted() {

        this.GetNumEncuesta();

    },
    methods: {
        Asignar(valor) {
            var f = new Date();
            this.numero_encuesta = valor.resultado;
            if (localStorage.localidad) {
                this.localidad = localStorage.localidad;
            }
            if (localStorage.zona) {
                this.zona = localStorage.zona;
            }
            this.fecha = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
        },
        GetNumEncuesta() {
            this.numero_encuesta = localStorage.numero_encuesta;
            this.fecha = localStorage.fecha;
            this.latitud = localStorage.latitud;
            this.longitud = localStorage.longitud;
        },
        Registrar() {

            let $this = this;
            console.log(this.respuestas);
            if (this.respuestas[1].opcion == "SI") {
                this.respuestas.push(this.respuesta_cambio[0]);
                this.respuestas.push(this.respuesta_cambio[1]);
            }


            if (this.respuestas[0].texto != '') {
                this.respuestas[0].tipo_respuesta = 1
            } else {
                this.respuestas[0].tipo_respuesta = 2
            }

            if (this.respuestas[2].texto != '') {
                this.respuestas[2].tipo_respuesta = 1
            } else {
                this.respuestas[2].tipo_respuesta = 2
            }

            if (this.respuestas[9].texto != '') {
                this.respuestas[9].tipo_respuesta = 1
            } else {
                this.respuestas[9].tipo_respuesta = 2
            }



            for (let i = 0; i < this.respuestas.length; i++) {
                var data = {
                    id_pregunta: this.respuestas[i].id_pregunta,
                    id_encuesta_union: localStorage.id_encuesta_union,
                    tipo_respuesta: this.respuestas[i].tipo_respuesta,
                    respuesta: this.respuestas[i].texto,
                    opcion: this.respuestas[i].opcion,
                };

                fetch(this.uri + "respuesta_encuesta/registrar", {
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
                        if ((i + 1) == $this.respuestas.length) {
                            window.location.href = $this.ubicacion + "html_Encuesta_Uso_Tierra/Formulario_Encuesta_Uso_Tierra_Introduccion.html";
                        }
                    });
            }

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