'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');
var especie_flora = require("./especie_flora");
const Grupo_Funcional = sequelize.define('Grupo_Funcional', {
    id_especie_flora: {
        type: Sequelize.INTEGER,
        references: 'Especie_Flora', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    },
    sindrome_dispersion: {
        type: Sequelize.STRING
    },
    estado_sucesional: {
        type: Sequelize.STRING
    },
    periocidad_hoja: {
        type: Sequelize.STRING
    },
    nro_coleccion: {
        type: Sequelize.INTEGER
    },
    descripcion_ubicacion: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

Grupo_Funcional.belongsTo(especie_flora,{foreignKey: 'id_especie_flora'}); // Set one to many relationship

module.exports = Grupo_Funcional;
