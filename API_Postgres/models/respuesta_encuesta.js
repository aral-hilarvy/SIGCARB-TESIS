'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Respuesta_Encuesta = sequelize.define('Respuesta_Encuesta', {
    id_pregunta: {
        type: Sequelize.INTEGER
    },
    id_encuesta_union: {
        type: Sequelize.INTEGER
    },
    tipo_respuesta: { // 1=respuesta , 2=opcion y 3=ambas
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


module.exports = Respuesta_Encuesta;