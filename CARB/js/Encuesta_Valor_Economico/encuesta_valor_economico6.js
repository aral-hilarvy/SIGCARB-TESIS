var formularioSeisValorEconomico = new Vue({
    el: "#formularioSeisValorEconomico",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        numero_encuesta: 0,
        nombre_encuestador: "",
        comunidad: "",
        tipo_asentamiento: "",
        id_usuario: "",
        respuestas: [{
                id_pregunta: 70,
                tipo_respuesta: 3,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 70,
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

        GetNumEncuesta() {
            this.numero_encuesta = localStorage.numero_encuesta;
            this.nombre_encuestador = localStorage.nombre + ' ' + localStorage.apellido;
            this.comunidad = localStorage.comunidad;
            this.tipo_asentamiento = localStorage.tipo_asentamiento;
        },
        Registrar() {

            let $this = this;
            //console.log(this.respuestas);

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
                            window.location.href = $this.ubicacion + "html_Encuesta_Valor_Economico/Formulario_Encuesta_1_Parte_1_3.html";
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