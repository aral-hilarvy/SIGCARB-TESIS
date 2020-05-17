'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');
var familia = require("./familia");
const Genero = sequelize.define('Genero', {
    id_familia: {
        type: Sequelize.INTEGER,
        references: 'Familia', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    },
    nombre: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});


Genero.belongsTo(familia,{foreignKey: 'id_familia'}); // Set one to many relationship

module.exports = Genero;
