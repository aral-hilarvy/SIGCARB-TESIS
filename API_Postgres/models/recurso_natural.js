'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const RecursoNatural = sequelize.define('Recurso_Natural', {
    nombre: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


module.exports = RecursoNatural;