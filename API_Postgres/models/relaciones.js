'use strict'
const Sequelize = require('sequelize');
const sequelize = require('../conection');

 const Espacio_Muestreo = require("./tipo_muestreo");
 const Encabezado_Levantamiento_Flora = require("./encabezado_levantamiento_flora");
 const Especie_Flora = require("./especie_flora");
 const Registro_Levantamiento_Flora = require('./registro_levantamiento_flora');
 const Ejemplar_Especie_Flora = require('./ejemplar_especie_flora');

 const User = require('./user');

 User.hasMany(Espacio_Muestreo,{
    foreignKey:'id_usuario',
    sourceKey:'id'
  })

Espacio_Muestreo.hasMany(Encabezado_Levantamiento_Flora,{as: 'Encabezado',
   foreignKey:'id_espacio_muestreo',
   sourceKey:'id'
 })
/*Encabezado_Levantamiento_Flora.belongsTo(Espacio_Muestreo, {
  foreignKey: 'id_espacio_muestreo',
  targetKey: 'id'
})*/


Encabezado_Levantamiento_Flora.hasMany(Registro_Levantamiento_Flora,{as:'Registro',
  foreignKey:'id_encabezado_levantamiento_flora',
  sourceKey:'id'
})

Registro_Levantamiento_Flora.belongsTo(Especie_Flora, {as:'Especie',
  foreignKey: 'id_especie_flora',
  targetKey: 'id'
})

Especie_Flora.hasMany(Registro_Levantamiento_Flora,{as:'Registros',
  foreignKey:'id_especie_flora',
  sourceKey:'id'
})

Registro_Levantamiento_Flora.hasMany(Ejemplar_Especie_Flora,{as:'Ejemplares',
  foreignKey:'id_registro_levantamiento_flora',
  sourceKey:'id'
})
Ejemplar_Especie_Flora.belongsTo(Registro_Levantamiento_Flora, {as:'Registro',
  foreignKey: 'id_registro_levantamiento_flora',
  targetKey: 'id'
})

module.exports = {
  User,
  Espacio_Muestreo,
  Encabezado_Levantamiento_Flora,
  Especie_Flora,
  Registro_Levantamiento_Flora,
  Ejemplar_Especie_Flora
};
