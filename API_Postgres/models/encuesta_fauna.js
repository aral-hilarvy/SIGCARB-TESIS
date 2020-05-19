'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Encuesta_Fauna = sequelize.define('Encuesta_Fauna', {
    numero_encuesta: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATE
    },
    localidad: {
        type: Sequelize.STRING
    },
    zona: {
        type: Sequelize.INTEGER
    },
    cabeza_familia: {
        type: Sequelize.STRING
    },
    id_usuario: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Encuesta_Fauna;