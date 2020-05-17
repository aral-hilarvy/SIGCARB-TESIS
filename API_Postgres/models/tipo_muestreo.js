'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

var encabezado_levantamiento_flora = require("./encabezado_levantamiento_flora");

const Tipo_Muestreo = sequelize.define('Espacio_Muestreo', {
    id_usuario: {
        type: Sequelize.INTEGER
    },
    tipo_bosque: {
        type: Sequelize.STRING
    },
    cod_espacio_muestreo: {
        type: Sequelize.STRING
    },
    cant_transectas: {
        type: Sequelize.INTEGER
    },
    id_grado_perturbacion: {
        type: Sequelize.INTEGER
    },
    latitud: {
        type: Sequelize.STRING
    },
    longitud: {
        type: Sequelize.STRING
    },
    ubicacion_espacio_muestreo: {
        type: Sequelize.GEOMETRY('POINT')
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos

});

/*encabezado_levantamiento_flora.belongsTo(Tipo_Muestreo, {
    foreignKey: 'id_espacio_muestreo'
});
Tipo_Muestreo.hasMany(encabezado_levantamiento_flora, {
    foreignKey: 'id_espacio_muestreo'
});*/

module.exports = Tipo_Muestreo;
