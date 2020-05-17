var modal_consultar_usuario = new Vue({
    el: "#modal_consultar_usuario",
    data: {
        mensaje: "algo",
        uri: "http://localhost:3978/api/",
        usuarios: [],
        id_usuario_selected: 0,
        DataUsuario: {},
        items: [],
        Usuario: {
            cedula: "",
            nombre: "",
            apellido: "",
            id_recurso_natural: 0,
            usuario: "",
            password: "",
            rol: "",
            status: ""
        },
        name_recurso_natural: ''

    },
    mounted() {
        this.inicializarUsuarios();
    },
    methods: {

        setearUsuarios(usuarios) {
            console.log(usuarios)
            this.usuarios = usuarios;
        },

        inicializarUsuarios() {
            if (localStorage.token) {
                this.token = localStorage.token;
            }
            let $this = this;
            fetch(this.uri + 'user/lists', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": this.token
                    }
                })
                .then(res => res.json())
                .catch(error => console.error("Error:", error))
                .then(response => $this.setearUsuarios(response.usuarios));
        },
        encontrar(usuario) {
            return usuario.id == this.id_usuario_selected;
        },
        SeleccionarUsuario() {
            //alert(this.id_usuario_selected)
            console.log(this.usuarios.find(this.encontrar));
            this.DataUsuario = this.usuarios.find(this.encontrar);
            this.nameRecursoNatural(this.DataUsuario.id_recurso_natural);

            this.Usuario.cedula = this.DataUsuario.cedula;
            this.Usuario.nombre = this.DataUsuario.nombre;
            this.Usuario.apellido = this.DataUsuario.apellido;
            this.Usuario.id_recurso_natural = this.DataUsuario.id_recurso_natural;
            this.Usuario.usuario = this.DataUsuario.usuario;
            this.Usuario.password = this.DataUsuario.contrasena;
            this.Usuario.rol = this.DataUsuario.rol_usuario;
            this.Usuario.status = this.DataUsuario.status;
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
            this.Usuario.nombre = '';
            this.Usuario.apellido = '';
            this.Usuario.cedula = '';
            this.Usuario.rol = '';
            this.Usuario.status = '';
            this.Usuario.usuario = '';
            this.Usuario.password = '';
            this.Usuario.id_recurso_natural = 0;
            this.password = '';
            this.repeat_pw = '';
            this.usuarios = [];
            this.name_recurso_natural = '';
            this.inicializarUsuarios();

        }
    }
});