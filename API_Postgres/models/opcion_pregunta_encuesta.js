'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Opcion_Pregunta_Encuesta = sequelize.define('Opcion_Pregunta_Encuesta', {
    id_pregunta_encuesta: {
        type: Sequelize.INTEGER
    },
    nombre_opcion: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


module.exports = Opcion_Pregunta_Encuesta;