var formularioTercerUsoTierra = new Vue({
    el: "#formularioTercerUsoTierra",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        numero_encuesta: 0,
        fecha: "",
        latitud: "",
        longitud: "",
        id_usuario: "",
        respuestas: [{
                id_pregunta: 48,
                tipo_respuesta: 2,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 84,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            { //varias respuesta para la pregunta 49
                id_pregunta: 49,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 49,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 49,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 49,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            { //varias respuesta para la pregunta 50
                id_pregunta: 50,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 50,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 50,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            { //varias respuesta para la pregunta 51
                id_pregunta: 51,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 51,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 51,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 51,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            { //varias respuesta para la pregunta 52
                id_pregunta: 52,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 52,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 52,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 52,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            { //varias respuesta para la pregunta 53
                id_pregunta: 53,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 53,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 53,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            },
            {
                id_pregunta: 54,
                tipo_respuesta: 1,
                opcion: '',
                texto: ''
            }
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
                            window.location.href = $this.ubicacion + "html_Encuesta_Uso_Tierra/Formulario_Encuesta_Uso_Tierra_4.html";
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