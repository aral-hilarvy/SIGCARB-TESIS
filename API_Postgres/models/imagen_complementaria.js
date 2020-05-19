'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Imagen_Complementaria = sequelize.define('Imagen_Complementaria', {
    id_usuario: {
        type: Sequelize.INTEGER
    },
    nombre_imagen: {
        type: Sequelize.STRING
    },
    año: {
        type: Sequelize.STRING
    },
    descripcion_imagen: {
        type: Sequelize.STRING
    },
    identificador: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = Imagen_Complementaria;