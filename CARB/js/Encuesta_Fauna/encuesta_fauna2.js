var encuestafauna2 = new Vue({
    el: "#formularioPrimeroFauna",
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
        respuestas: [{
                id_pregunta: 1,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 2,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 3,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 4,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 5,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 6,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 7,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 8,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 9,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
        ]
    },
    created() {
        this.getPreguntas();
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
        getPreguntas() {
            let $this = this;
            fetch(this.uri + "pregunta/list_preguntas/1/1")
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.SetearPreguntas(response));
        },
        SetearPreguntas(response) {
            this.preguntas = response.resultado;
            console.log(response);
        },
        Registrar() {

            let $this = this;
            console.log(this.respuestas[0].opcion);
            console.log(this.respuestas[0].texto);

            if (this.respuestas[0].opcion != '') {
                this.respuestas[0].tipo_respuesta = 2;
            } else {
                this.respuestas[0].tipo_respuesta = 1;
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
                        if ((i + 1) == $this.respuestas.length) {
                            window.location.href = $this.ubicacion + "html_Encuesta_Fauna/Formulario_Encuesta_Fauna_3.html";
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