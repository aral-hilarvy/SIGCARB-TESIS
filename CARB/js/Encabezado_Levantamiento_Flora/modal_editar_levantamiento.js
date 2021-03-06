var modal_editar_levantamiento = new Vue({
    el: "#modal_editar_levantamiento",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: window.location.href.split("/").slice(0, window.location.href.split("/").length-2).join('/')+'/',
        enc_lev_fl: [],
        esp_muestreo: null,
        id_encab_lev_fl: 0
    },
    mounted() {
        //this.initEncabLev();
        this.initEspMuest();
    },
    methods: {

        Asignar2(response) {
            console.log(response.resultado)
            if (response.resultado.length > 0) {
                for (let i = 0; i <= response.resultado.length; i++) {
                    if (i < response.resultado.length) {
                        this.enc_lev_fl.push(response.resultado[i]);
                    } else {
                        this.enc_lev_fl.sort(function (a, b) {
                            return (a.nro_levantamiento - b.nro_levantamiento)
                        })
                    }

                }
            }

            console.log(this.enc_lev_fl)
        },
        initEncabLev(id_esp_muestreo) {
            console.log(id_esp_muestreo)
            let $this = this;
            fetch(this.uri + "encabezadolf/list_esp_mue/" + id_esp_muestreo)
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.Asignar2(response));
        },

        Asignar(response) {
            console.log(response)
            this.esp_muestreo = response.resultado;
            for (let i = 0; i < response.resultado.length; i++) {
                this.initEncabLev(response.resultado[i].id);
            }
        },
        initEspMuest() {
            if (localStorage.id) {
                this.id_usuario = localStorage.id;
            }
            let $this = this;
            fetch(this.uri + "tipo_muestreo/list/" + this.id_usuario)
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.Asignar(response));
        },
        Ir: function () {
            let validate = this.Validar();
            let $this = this;

            if (validate) {
                localStorage.id_encabezado_levantamiento_flora = this.id_encab_lev_fl;
                window.location.href = 'Editar_Levantamiento_Vegetacion.html'
            }
        },

        AlertStyle(titulo, descripcion, icono) {
            swal({
                title: `${titulo}`,
                text: `${descripcion}`,
                icon: `${icono}`,
                buttons: {
                    OK: true
                }
            }).then(value => {
                console.log(value);

            });
        },
        Validar() {
            if (!this.id_encab_lev_fl) {
                $("#ED_levantamiento").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione N° Levantamiento", "error");
            } else {
                return true;
            }
        },

    },
    filters: {
        agregar: function (value) {
            if (!value) return ''
            var str = "" + value
            var pad = "0000"
            var ans = pad.substring(0, pad.length - str.length) + str
            // value = value.toString()
            return ans;
        }
    }
});