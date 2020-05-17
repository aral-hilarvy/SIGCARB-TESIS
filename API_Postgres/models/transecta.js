'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Transecta = sequelize.define('Transecta', {
    id_espacio_muestreo: {
        type: Sequelize.BIGINT
    },
    nro_transecta: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Transecta;