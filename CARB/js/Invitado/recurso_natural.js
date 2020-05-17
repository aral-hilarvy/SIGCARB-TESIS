var wrapper = new Vue({
    el: "#wrapper",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        descripcion: '',
        id_recurso_natural: 0,
        items: [],
        item: {}
    },
    mounted() {
        this.inicializarRecursoNatural();
    },


    methods: {

        inicializarRecursoNatural() {
            localStorage.usuario_invitado = true;
            let $this = this;
            fetch(this.uri + 'recurso_natural/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },
        setear(items) {
            this.items = items;
            console.log(items)
        },
        setearRedireccionar(id_rec_nat) {
            localStorage.id_recurso_natural = id_rec_nat;
            window.open('./html_info_complementaria/ver_info_complementaria.html', '_blank');
        }
    }

});