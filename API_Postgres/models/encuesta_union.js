'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Encuesta_Union = sequelize.define('Encuesta_Union', {
    id_encuesta: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Encuesta_Union;