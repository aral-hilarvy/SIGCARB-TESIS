'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');
var genero = require("./genero");
var ejemplar_especie_flora = require("./ejemplar_especie_flora");
var registro_levantamiento_flora = require("./registro_levantamiento_flora");
const Especie_Flora = sequelize.define('Especie_Flora', {
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
    descripcion_esp_flora: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

Especie_Flora.belongsTo(genero,{foreignKey: 'id_genero'});
//Especie_Flora.hasMany(registro_levantamiento_flora,{foreignKey: 'id_especie_flora'}); // Set one to many relationship

module.exports = Especie_Flora;
