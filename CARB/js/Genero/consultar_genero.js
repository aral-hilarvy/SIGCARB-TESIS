var modal_consultar_genero = new Vue({
    el: "#modal_consultar_genero",
    data: {
        uri: "http://localhost:3978/api/",
        nombre: '',
        descripcion: '',
        id_familia: 0,
        id_genero_selected: 0,
        generos: [],
        familias: [],
        name_familia: '',
        name_recurso_natural: '',
        Genero: {
            id: 0,
            nombre: '',
            descripcion: '',
            id_familia: 0
        },
        DataGenero: {},
    },
    mounted() {
        this.inicializarGenero();
        this.InicializarFamilias();
    },


    methods: {
        setear(items) {
            this.generos = items;
        },
        inicializarGenero() {
            let $this = this;
            fetch(this.uri + 'genero/lists')
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

        encontrar(generos) {
            return generos.id == this.id_genero_selected;
        },
        SeleccionarGenero() {
            //alert(this.id_familia_selected)
            console.log(this.generos.find(this.encontrar));
            this.DataGenero = this.generos.find(this.encontrar);
            this.nameFamilia(this.DataGenero.id_familia);
            this.Genero.id = this.DataGenero.id;
            this.Genero.nombre = this.DataGenero.nombre;
            this.Genero.descripcion = this.DataGenero.descripcion;
            this.Genero.id_familia = this.DataGenero.id_familia;
        },
        setearNameFamilia(familia) {
            console.log(familia);
            this.name_familia = familia.nombre;
            this.nameRecursoNatural(familia.tipo_recurso_natural)
        },
        nameFamilia(id) {
            if (id > 0) {
                let $this = this;
                fetch(`${this.uri}familia/list/${id}`)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => $this.setearNameFamilia(response.resultado));
            } else {
                this.name_familia = '';
            }

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
        VaciarForm() {
            this.name_recurso_natural = '';
            this.name_familia = '';
            this.Genero.id = 0;
            this.Genero.nombre = '';
            this.Genero.descripcion = '';
            this.Genero.id_familia = 0;
        }

    }
});