var encuestafauna3 = new Vue({
    el: "#formularioTerceroFauna",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        numero_encuesta: 0,
        fecha: "",
        localidad: "",
        zona: "",
        cabeza_familia: "",
        id_usuario: "",
        preguntas: [{
            id: 0,
            nombre: "",
            num_pag: 0,
            tipo_encuesta: 0
        }],
        reserva_forestal: '',
        otros: '',
        respuestas: [{
                id_pregunta: 18,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 19,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 20,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 21,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 22,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 25,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            }
        ],
        respuestas_ultima: [{
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 23,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            }
        ]
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
            let $this = this;
            fetch(this.uri + "encuesta_fauna/numero_encuesta")
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.Asignar(response));
        },
        Registrar() {

            let $this = this;


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

                        if ((i + 1) == $this.respuestas.length) {
                            for (let p = 0; p < $this.respuestas_ultima.length; p++) {
                                var data = {
                                    id_pregunta: $this.respuestas_ultima[p].id_pregunta,
                                    id_encuesta_union: localStorage.id_encuesta_union,
                                    tipo_respuesta: $this.respuestas_ultima[p].tipo_respuesta,
                                    respuesta: $this.respuestas_ultima[p].texto,
                                    opcion: $this.respuestas_ultima[p].opcion,
                                };

                                fetch($this.uri + "respuesta_encuesta/registrar", {
                                        method: "POST", // or 'PUT'
                                        body: JSON.stringify(data), // data can be `string` or {object}!
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    })
                                    .then(res => res.json())
                                    .catch(error => console.error("Error:", error))
                                    .then(response => {
                                        if ((p + 1) == $this.respuestas_ultima.length) {
                                            window.location.href = $this.ubicacion + "html_Encuesta_Fauna/Formulario_Encuesta_Fauna_1.html";
                                        }
                                    });
                            }
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