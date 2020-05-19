'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

const Familia = sequelize.define('Familia', {
    nombre: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    tipo_recurso_natural: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false, //desabilitar createdAt y updatedAt
    freezeTableName: true, //configuracion para que no se ponga en plural los modelos
});

/*Familia.associate = function (models) {
    // associations can be defined here
    Familia.hasMany(models.Genero, {
        foreignKey: 'id_familia',
        onDelete: 'cascade',
        hooks: true
    });
};*/

module.exports = Familia;
