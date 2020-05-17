var modal_consultar_EspacioMuestreo = new Vue({
    el: "#modal_consultar_EspacioMuestreo",
    data: {
        uri: "http://localhost:3978/api/",
        muestreos_continuo: [],
        muestreos_fragmentado: [],

    },
    mounted() {
        this.contadorRegistros();
    },
    methods: {
        setear(registros) {
            console.log(registros);
            this.muestreos_continuo = registros.resultado.filter(function (el) {
                return el.tipo_bosque == "Bosque Continuo";
            });
            this.muestreos_fragmentado = registros.resultado.filter(function (el) {
                return el.tipo_bosque == "Bosque Fragmentado";
            });

        },
        contadorRegistros() {
            if (localStorage.id) {
                this.id_usuario = localStorage.id;
            }
            let $this = this;
            fetch(this.uri + 'tipo_muestreo/list/' + this.id_usuario)
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response));
        },
    }
});