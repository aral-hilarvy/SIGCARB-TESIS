'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

var espacio_muestreo = require("./tipo_muestreo");
var Registro_Levantamiento_Flora = require('./registro_levantamiento_flora');

const Encabezado_Levantamiento_Flora = sequelize.define('Encabezado_Levantamiento_Flora', {
    id_espacio_muestreo: {
        type: Sequelize.INTEGER
    },
    nro_levantamiento: {
        type: Sequelize.BIGINT
    },
    fecha: {
        type: Sequelize.DATE
    },
    localidad: {
        type: Sequelize.STRING
    },
    uso_asociado: {
        type: Sequelize.STRING
    },
    pendiente_general: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    tipo_perturbacion: {
        type: Sequelize.STRING
    },
    direccion_transecta: {
        type: Sequelize.STRING
    },
    latitud: {
        type: Sequelize.STRING
    },
    longitud: {
        type: Sequelize.STRING
    },
    ubicacion_punto_muestreo: {
        type: Sequelize.GEOMETRY('POINT')
    },
    nro_transecta: {
        type: Sequelize.INTEGER
    },

}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
}
);
// en una relacion 1:N en el archivo de la N es que se pone ambas relaciones
/*Encabezado_Levantamiento_Flora.belongsTo(espacio_muestreo, {
    foreignKey: 'id_espacio_muestreo'
});*/

/*espacio_muestreo.hasMany(Encabezado_Levantamiento_Flora, {
    foreignKey: 'id_espacio_muestreo'
});*/

/*Encabezado_Levantamiento_Flora.hasMany(Registro_Levantamiento_Flora, {
    foreignKey: 'id_encabezado_levantamiento_flora'
});*/

//Encabezado_Levantamiento_Flora.hasMany(Registro_Levantamiento_Flora);*/


module.exports = Encabezado_Levantamiento_Flora;
