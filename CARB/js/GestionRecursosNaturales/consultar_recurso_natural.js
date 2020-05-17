var modal_consultar_recurso = new Vue({
    el: "#modal_consultar_recurso",
    data: {
        uri: "http://localhost:3978/api/",
        items: [],
    },
    mounted() {
        this.inicializarRecursoNatural();
    },
    methods: {
        setear(items) {
            this.items = items;
        },
        inicializarRecursoNatural() {
            let $this = this;
            fetch(this.uri + 'recurso_natural/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },
    }
});