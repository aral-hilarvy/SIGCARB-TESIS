'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Respuesta = sequelize.define('Respuesta', {
    contenido: {
        type: Sequelize.STRING
    },
    id_resp_encuesta: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


module.exports = Respuesta;