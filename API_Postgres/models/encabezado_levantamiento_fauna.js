'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Encabezado_Levantamiento_Fauna = sequelize.define('Encabezado_Levantamiento_Fauna', {
    id_usuario: {
        type: Sequelize.INTEGER
    },
    nro_observacion: {
        type: Sequelize.BIGINT
    },
    localidad: {
        type: Sequelize.STRING
    },
    sector: {
        type: Sequelize.STRING
    },
    paisaje_funcional: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Encabezado_Levantamiento_Fauna;