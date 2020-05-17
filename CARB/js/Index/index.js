var wrapper = new Vue({
    el: "#wrapper",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: "/home/rendallrojas/Desarrollos_Node/TESIS/CARB/",
        numero_encuesta: 0,

    },
    mounted() {

        this.SetUserInvitado();

    },
    methods: {

        SetUserInvitado() {
            localStorage.usuario_invitado = true;
        },


    }
});