'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Observacion_Fauna = sequelize.define('Observacion_Fauna', {
    id_especie_fauna: {
        type: Sequelize.INTEGER
    },
    id_encabezado_levantamiento_fauna: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATE
    },
    hora: {
        type: Sequelize.TIME
    },
    latitud: {
        type: Sequelize.STRING
    },
    longitud: {
        type: Sequelize.STRING
    },
    microhabitat: {
        type: Sequelize.STRING
    },
    actividad: {
        type: Sequelize.STRING
    },
    comentarios_observaciones: {
        type: Sequelize.STRING
    },
    muestra_fauna: {
        type: Sequelize.GEOMETRY('POINT')
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Observacion_Fauna;