'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Datos_Cobertura = sequelize.define('Datos_Cobertura', {
    gid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    paisaje: {
        type: Sequelize.STRING
    },
    cover_i: {
        type: Sequelize.STRING
    },
    uso_asociado: {
        type: Sequelize.STRING
    },
    uso_dominante: {
        type: Sequelize.STRING
    },
    id_subtipo_cobertura: {
        type: Sequelize.INTEGER
    },
    area: {
        type: Sequelize.INTEGER
    },
    perimetro: {
        type: Sequelize.INTEGER
    },
    tenencia: {
        type: Sequelize.STRING
    },
    geom: {
        type: Sequelize.GEOMETRY("MultiPolygon")
    },
    anio: {
        type: Sequelize.INTEGER
    },
    prueba: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


module.exports = Datos_Cobertura;