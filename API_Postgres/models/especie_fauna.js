'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');
var genero = require("./genero");
const Especie_Fauna = sequelize.define('Especie_Fauna', {
    id_genero: {
        type: Sequelize.BIGINT,
        references: 'Genero', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    },
    nombre_especie: {
        type: Sequelize.STRING
    },
    nombre_comun: {
        type: Sequelize.STRING
    },
    nombre_cientifico: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

Especie_Fauna.belongsTo(genero,{foreignKey: 'id_genero'}); // Set one to many relationship

module.exports = Especie_Fauna;
