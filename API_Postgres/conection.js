'use strict'
const Sequelize = require('sequelize');


const db = new Sequelize('postgresql://r18rendall:18011993roco@localhost:5432/gisdata');

module.exports = db;

/*const Promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: Promise
  };
  var pgp = require('pg-promise')(options);
  var connectionString = 'postgresql://r18rendall:18011993roco@localhost:5432/gisdata';
  var db = pgp(connectionString);

  module.exports= db;*/
