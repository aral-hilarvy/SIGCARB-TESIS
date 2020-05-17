'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var middleware_a = require('../middlewares/autenticacion');

var multipart = require('connect-multiparty'); //instancia de libreria para enviar archivos por http
//var middleware_upload=multipart({uploadDir:'./uploads/users'});//se asocia un middleware a la ruta donde se guardaran los iconos del usuario

api.post('/registrar_usuario', middleware_a.ensureAuth, UserController.saveUser);
api.post('/login', UserController.LogingUser);
api.get('/lists', middleware_a.ensureAuth, UserController.list_users);
api.put('/update/:id', middleware_a.ensureAuth, UserController.updateUser);

api.put('/update_levantamientos/:id', middleware_a.ensureAuth, UserController.updateLevantamientos);
api.put('/update_fragmentados/:id', middleware_a.ensureAuth, UserController.updateFragmentados);
api.put('/update_continuos/:id', middleware_a.ensureAuth, UserController.updateContinuos);

api.get('/list/:id', middleware_a.ensureAuth, UserController.list_user);
api.put("/delete/:id", middleware_a.ensureAuth, UserController.deleteUser);


module.exports = api;