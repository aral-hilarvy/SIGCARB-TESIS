var wrapper = new Vue({
    el: "#wrapper",
    data: {
        uri: "http://localhost:3978/api/",
        ubicacion: window.location.href.split("/").slice(0, window.location.href.split("/").length-2).join('/')+'/',
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