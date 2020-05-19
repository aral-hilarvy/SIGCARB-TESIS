var modal_editar_GrupoFuncional = new Vue({
    el: "#modal_editar_GrupoFuncional",
    data: {
        uri: "http://localhost:3978/api/",
        id_usuario: "",
        token: '',
        g_funcional: null,
        nro_coleccion: 0,
        id_EDGrupoFuncional: 0
    },
    mounted() {
        this.ConteoNumeroCol();
    },
    methods: {
        IniContador(response) {
            console.log(response.resultado)
            this.g_funcional = response.resultado;
        },
        ConteoNumeroCol() {
            let $this = this;
            fetch(this.uri + "grupo_funcional/lists")
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => {
                    $this.IniContador(response);
                });
        },

        Edit: function () {
            let $this = this;
            let validate = this.Validar()
            if (validate) {
                localStorage.id_EDGrupoFuncional = this.id_EDGrupoFuncional;
                window.location.href = 'Editar_Grupos_Funcionales.html';
            }

        },

        Validar() {
            if (this.id_EDGrupoFuncional < 1) {
                $("#ED_GrupoFuncional").css("border-color", "#FF0000");
                this.AlertStyle("¡ATENCIÓN!", "Seleccione Grupo Funcional", "error");
                return false;
            } else {
                return true;
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

            });
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