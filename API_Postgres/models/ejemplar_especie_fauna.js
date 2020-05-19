'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Ejemplar_Especie_Fauna = sequelize.define('Ejemplar_Especie_Fauna', {
    id_especie_fauna: {
        type: Sequelize.INTEGER
    },
    id_observacion_fauna: {
        type: Sequelize.INTEGER
    },
    latitud: {
        type: Sequelize.STRING
    },
    longitud: {
        type: Sequelize.STRING
    },
    ubicacion_especie_fauna: {
        type: Sequelize.GEOMETRY('POINT')
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Ejemplar_Especie_Fauna;