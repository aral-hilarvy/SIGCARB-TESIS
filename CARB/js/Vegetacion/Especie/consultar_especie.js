var modal_consultar_especie_veg = new Vue({
    el: "#modal_consultar_especie_veg",
    data: {
        uri: "http://localhost:3978/api/",
        id_genero: 0,
        generos: [],
        name_genero: '',
        name_familia: '',
        especies: [],
        id_especie_selected: 0,
        Especie: {
            id: 0,
            id_genero: 0,
            nombre_especie: '',
            nombre_comun: '',
            nombre_cientifico: '',
            descripcion_esp_flora: ''
        },
        DataEspecie: {},
    },
    mounted() {
        this.inicializarEspecies();
        this.InicializarGeneros();
    },


    methods: {
        setear(generos) {
            this.generos = generos;
        },
        InicializarGeneros() {
            let $this = this;
            fetch(this.uri + 'genero/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setear(response.resultado));
        },
        setearEspecies(items) {
            console.log(items)
            this.especies = items;
        },
        inicializarEspecies() {
            let $this = this;
            fetch(this.uri + 'especief/lists')
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearEspecies(response.resultado));
        },

        encontrar(especie) {
            return especie.id == this.id_especie_selected;
        },
        SeleccionarEspecie() {
            //console.log(this.familias.find(this.encontrar));
            this.DataEspecie = this.especies.find(this.encontrar);
            this.nameGenero(this.DataEspecie.id_genero);
            this.Especie.id = this.DataEspecie.id;
            this.Especie.id_genero = this.DataEspecie.id_genero;
            this.Especie.nombre_especie = this.DataEspecie.nombre_especie;
            this.Especie.nombre_comun = this.DataEspecie.nombre_comun;
            this.Especie.nombre_cientifico = this.DataEspecie.nombre_cientifico;
            this.Especie.descripcion_esp_flora = this.DataEspecie.descripcion_esp_flora;
        },
        setearGenero(genero) {
            console.log(genero);
            this.name_genero = genero.nombre;
            this.nameFamilia(genero.id_familia);
        },
        nameGenero(id) {
            if (id > 0) {
                let $this = this;
                fetch(`${this.uri}genero/list/${id}`)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => $this.setearGenero(response.resultado));
            } else {
                this.name_genero = '';
            }

        },
        setearNameRN(familia) {
            console.log(familia);
            this.name_familia = familia.nombre;
        },
        nameFamilia(id) {
            if (id > 0) {
                let $this = this;
                fetch(`${this.uri}familia/list/${id}`)
                    .then(res => res.json())
                    .catch(error => console.error("Error:", error))
                    .then(response => $this.setearNameRN(response.resultado));
            } else {
                this.name_familia = '';
            }

        },

    }
});