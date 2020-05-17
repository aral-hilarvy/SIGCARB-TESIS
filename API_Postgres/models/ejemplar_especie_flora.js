'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Ejemplar_Especie_Flora = sequelize.define('Ejemplar_Especie_Flora', {
    id_registro_levantamiento_flora: {
        type: Sequelize.INTEGER,
        references: 'Registro_Levantamiento_Flora', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    },
    ubicacion_especie_flora: {
        type: Sequelize.GEOMETRY('POINT')
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Ejemplar_Especie_Flora;
