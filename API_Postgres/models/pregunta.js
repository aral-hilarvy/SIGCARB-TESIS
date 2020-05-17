'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Pregunta_Fauna = sequelize.define('Pregunta', {
    nombre: {
        type: Sequelize.STRING
    },
    num_pag: {
        type: Sequelize.INTEGER
    },
    tipo_encuesta: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Pregunta_Fauna;