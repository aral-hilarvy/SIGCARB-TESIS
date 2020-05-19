var modal_consultar_tipoMuestreo = new Vue({
    el: "#modal_consultar_tipoMuestreo",
    data: {
        uri: "http://localhost:3978/api/",
        items: [],
    },
    mounted() {
        this.inicializarTipoMuestreo();
    },
    methods: {
        setear(items) {
            this.items = items;
        },
        inicializarTipoMuestreo() {
            let $this = this;
            fetch(this.uri + 'tipo_muestreo/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },
    }
});