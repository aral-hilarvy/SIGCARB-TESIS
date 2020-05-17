'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Encuesta_Valor_Economico = sequelize.define('Encuesta_Valor_Economico', {
    num_encuesta: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATE
    },
    hora_inicio: {
        type: Sequelize.STRING
    },
    hora_fin: {
        type: Sequelize.STRING
    },
    comunidad: {
        type: Sequelize.STRING
    },
    tipo_asentamiento: {
        type: Sequelize.STRING
    },
    grupo_etnico: {
        type: Sequelize.STRING
    },
    altitud: {
        type: Sequelize.STRING
    },
    utm: {
        type: Sequelize.STRING
    },
    encuestador: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Encuesta_Valor_Economico;