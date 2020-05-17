'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Encuesta_Uso_Tierra = sequelize.define('Encuesta_Uso_Tierra', {
    num_encuesta: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATE
    },
    hora: {
        type: Sequelize.STRING
    },
    latitud: {
        type: Sequelize.STRING
    },
    longitud: {
        type: Sequelize.STRING
    },
    altitud: {
        type: Sequelize.STRING
    },
    encuestador: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Encuesta_Uso_Tierra;