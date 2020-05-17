'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Encuesta = sequelize.define('Encuesta', {
    nro_encuesta: {
        type: Sequelize.INTEGER
    },
    titulo_encuesta: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    id_usuario: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Encuesta;