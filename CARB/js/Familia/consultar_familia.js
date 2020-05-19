var modal_consultar_familia = new Vue({
    el: "#modal_consultar_familia",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        descripcion: '',
        id_recurso_natural: 0,
        items: [],
        familias: [],
        id_familia_selected: 0,
        Familia: {
            id: 0,
            nombre: '',
            descripcion: '',
            id_tipo_recurso_natural: 0
        },
        DataFamilia: {},
        name_recurso_natural: ''
    },
    mounted() {
        this.inicializarRecursoNatural();
        this.InicializarFamilias();
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
        setearFamilias(items) {
            console.log(items)
            this.familias = items;
        },
        InicializarFamilias() {
            let $this = this;
            fetch(this.uri + 'familia/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearFamilias(response.resultado));
        },

        encontrar(familias) {
            return familias.id == this.id_familia_selected;
        },
        SeleccionarFamilia() {
            //alert(this.id_familia_selected)
            console.log(this.familias.find(this.encontrar));
            this.DataFamilia = this.familias.find(this.encontrar);
            this.nameRecursoNatural(this.DataFamilia.tipo_recurso_natural);
            this.Familia.id = this.DataFamilia.id;
            this.Familia.nombre = this.DataFamilia.nombre;
            this.Familia.descripcion = this.DataFamilia.descripcion;
            this.Familia.id_tipo_recurso_natural = this.DataFamilia.tipo_recurso_natural;
        },
        setearNameRN(recurso_n) {
            console.log(recurso_n);
            this.name_recurso_natural = recurso_n.nombre;
        },
        nameRecursoNatural(id) {
            if (id > 0) {
                let $this = this;
                fetch(`${this.uri}recurso_natural/list/${id}`)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => $this.setearNameRN(response.resultado));
            } else {
                this.name_recurso_natural = '';
            }

        },

    }
});