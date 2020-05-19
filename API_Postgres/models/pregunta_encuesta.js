'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Pregunta_Encuesta = sequelize.define('Pregunta_Encuesta', {
    id_encuesta: {
        type: Sequelize.INTEGER
    },
    contenido_pregunta: {
        type: Sequelize.STRING
    },
    tipo_pregunta: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


module.exports = Pregunta_Encuesta;