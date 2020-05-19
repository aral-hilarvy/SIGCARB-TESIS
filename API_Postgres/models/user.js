'use strict'
const Sequelize = require('sequelize');

const sequelize = require('../conection');
const User = sequelize.define('usuario', {
    /*id_usuario: {
        primaryKey: true,
        type: sequelize.INTEGER
    },*/
    nombre: {
        type: Sequelize.STRING
    },
    apellido: {
        type: Sequelize.STRING
    },
    cedula: {
        type: Sequelize.STRING
    },
    rol_usuario: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    usuario: {
        type: Sequelize.STRING
    },
    contrasena: {
        type: Sequelize.STRING
    },
    id_recurso_natural: {
        type: Sequelize.INTEGER
    },
    cant_levantamientos: {
        type: Sequelize.INTEGER
    },
    cant_fragmentados: {
        type: Sequelize.INTEGER
    },
    cant_continuos: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

module.exports = User;