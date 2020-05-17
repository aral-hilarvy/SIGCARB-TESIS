'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

var Encabezado_Levantamiento_Flora = require("./encabezado_levantamiento_flora");
var especie_flora = require("./especie_flora");

const Registro_Levantamiento_Flora = sequelize.define('Registro_Levantamiento_Flora', {
    id_encabezado_levantamiento_flora: {
        type: Sequelize.INTEGER,
    },
    id_especie_flora: {
        type: Sequelize.INTEGER,
        references: 'Especie_Flora', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    },
    nro_cuadrante: {
        type: Sequelize.STRING
    },
    nro_estacion: {
        type: Sequelize.STRING
    },
    diametro_altura_pecho: {
        type: Sequelize.DOUBLE
    },
    altura_maxima: {
        type: Sequelize.DOUBLE
    },
    distancia: {
        type: Sequelize.DOUBLE
    },
    posicion_sociologica: {
        type: Sequelize.CHAR
    },
    porcentaje_cobertura_gap_dosel: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    pendiente: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
}
);

/*Registro_Levantamiento_Flora.belongsTo(encabezado_levantamiento_flora, {
    foreignKey: 'id_encabezado_levantamiento_flora'
});*/
/*
Registro_Levantamiento_Flora.belongsTo(especie_flora, {
    foreignKey: 'id_encabezado_levantamiento_flora'
});
Encabezado_Levantamiento_Flora.hasMany(Registro_Levantamiento_Flora, {
    foreignKey: 'id_encabezado_levantamiento_flora'
});*/

/*Registro_Levantamiento_Flora.belongsTo(especie_flora, {
    foreignKey: 'id_especie_flora'
});*/


module.exports = Registro_Levantamiento_Flora;
