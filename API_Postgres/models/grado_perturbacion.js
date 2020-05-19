'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const GradoPerturbacion = sequelize.define('Grado_Perturbacion', {

    descripcion: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


module.exports = GradoPerturbacion;