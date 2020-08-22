'use strict'
const Sequelize = require('sequelize');


const db = new Sequelize('postgresql://NOMBREUSUARIODB:CLAVEDB@localhost:5432/gisdata');

module.exports = db;

