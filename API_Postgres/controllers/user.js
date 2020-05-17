'use strict'

//var user=require('../models/user');//importa el modelo
var bcrypt = require('bcrypt-nodejs'); //encriptar datos de usuario
var jwt = require('../services/jwt');
const Sequelize = require('sequelize');
var user = require('../models/user');

const Op = Sequelize.Op;

function saveUser(req, res, next) {

    var parametros = req.body;

    if (parametros.contraseña) {
        bcrypt.hash(parametros.contraseña, null, null, (error, hash) => {
            parametros.contraseña = hash;

            if (parametros.nombre && parametros.apellido && parametros.cedula && parametros.usuario && parametros.rol_usuario && parametros.status) {
                user
                    .findOrCreate({
                        where: {
                            cedula: parametros.cedula,
                            [Op.or]: [{
                                usuario: parametros.usuario
                            }]
                        },
                        defaults: {
                            apellido: parametros.apellido,
                            rol_usuario: parametros.rol_usuario,
                            status: parametros.status,
                            usuario: parametros.usuario,
                            contrasena: parametros.contraseña,
                            nombre: parametros.nombre,
                            cedula: parametros.cedula,
                            id_recurso_natural: parametros.id_recurso_natural,
                            cant_levantamientos: 0,
                            cant_fragmentados: 0,
                            cant_continuos: 0
                        }
                    })
                    .spread((user, created) => {
                        if (created) {
                            res.status(200)
                                .json({
                                    status: 'success',
                                    title: '¡Éxito!',
                                    message: 'Usuario Registrado Con Éxito'
                                });
                        } else {
                            res.status(200)
                                .json({
                                    status: 'error',
                                    title: '¡ERROR!',
                                    message: 'El Usuario ya Existe'
                                });
                        }
                    })
            } else {
                res.status(200).send({
                    status: 'error',
                    title: '¡ERROR!',
                    message: 'Introduzca todos los Datos'
                });
            }
        });
    } else {
        res.status(200).send({
            status: 'error',
            title: '¡ERROR!',
            message: 'Introduzca una Contraseña'
        });
    }
}


function LogingUser(req, res) {
    var parametros = req.body;

    var usuario = parametros.usuario;
    var password = parametros.password;
    user.findOne({
        where: {
            usuario: usuario
        }
    }).then(usuario => {
        if (usuario) {
            bcrypt.compare(password, usuario.contrasena, (error, check) => {

                if (check) {
                    if (parametros.gethash) //devolver un token de jwt
                    {
                        res.status(200).send({
                            token: jwt.createToken(usuario)
                        })
                    } else {
                        res.status(200).send({
                            status: 'success',
                            usuario: usuario
                        });
                    }
                } else {
                    res.status(404).send({
                        status: 'error',
                        message: 'Contraseña incorrecta'
                    });
                }
                if (error) {
                    res.status(404).send({
                        error
                    });
                }
            })
        } else {
            res.status(200).send({
                status: 'error',
                message: 'Usuario no existe, Por favor revise sus credenciales'
            });
        }
    })
}

function updateUser(req, res) {
    var userId = req.params.id; // req.params es un json con los valores de los parametros que se pasan por la ruta
    var parametros = req.body;

    if (parametros.edit_contraseña) {
        bcrypt.hash(parametros.contraseña, null, null, (error, hash) => {
            parametros.contraseña = hash;
        });
    }
    user.update({
            apellido: parametros.apellido,
            rol_usuario: parametros.rol_usuario,
            status: parametros.status,
            usuario: parametros.usuario,
            contrasena: parametros.contraseña,
            nombre: parametros.nombre,
            cedula: parametros.cedula,
            id_recurso_natural: parametros.id_recurso_natural
        }, {
            where: {
                id: userId
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Usuario Actualizado con Éxito',
                title: '¡ÉXITO!',
                resultado: result
            })
        )
        .catch(err =>
            res.status(200).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al actualizar usuario',
                resultado: err
            })
        )
}

function updateLevantamientos(req, res) {
    var userId = req.params.id;
    var parametros = req.body;

    user.update({
            cant_levantamientos: parametros.cant_levantamientos,
        }, {
            where: {
                id: userId
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Levantamientos Incrementado con Éxito',
                title: '¡ÉXITO!',
                resultado: result
            })
        )
        .catch(err =>
            res.status(200).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Incrementar Levantamientos en Usuario',
                resultado: err
            })
        )
}

function updateContinuos(req, res) {
    var userId = req.params.id;
    var parametros = req.body;

    user.update({
            cant_continuos: parametros.cant_continuos,
        }, {
            where: {
                id: userId
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Continuos Incrementado con Éxito',
                title: '¡ÉXITO!',
                resultado: result
            })
        )
        .catch(err =>
            res.status(200).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Incrementar Continuos en Usuario',
                resultado: err
            })
        )
}

function updateFragmentados(req, res) {
    var userId = req.params.id;
    var parametros = req.body;

    user.update({
            cant_fragmentados: parametros.cant_fragmentados,
        }, {
            where: {
                id: userId
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Fragmentados Incrementado con Éxito',
                title: '¡ÉXITO!',
                resultado: result
            })
        )
        .catch(err =>
            res.status(200).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Incrementar Fragmentados en Usuario',
                resultado: err
            })
        )
}

function list_user(req, res, next) {
    var id_user = parseInt(req.params.id);
    user.findById(id_user).then(usuario => {
        if (usuario) {
            res.status(200).json({
                status: 'success',
                usuario: usuario
            });
        } else {
            res.status(200).send({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
    })
}

function list_users(req, res, next) {
    user.findAll({
        where: {
            [Op.or]: [{
                status: 'A'
            }, {
                status: 'I'
            }]
        }
    }).then(usuarios => {
        if (usuarios) {
            res.status(200).send({
                status: 'success',
                usuarios: usuarios
            });
        } else {
            res.status(200).send({
                status: 'error',
                message: 'No hay usuarios registrados'
            });
        }

    })
}

function deleteUser(req, res, next) {
    var user_Id = parseInt(req.params.id);
    user.update({
            status: 'D',
        }, {
            where: {
                id: user_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Usuario Eliminado con Éxito',
                title: '¡ÉXITO!',
                resultado: result
            })
        )
        .catch(err =>
            res.status(200).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al eliminar usuario',
                resultado: err
            })
        )
    /* user.destroy({
             where: {
                 id: user_Id
             },
         }).then(result => {
             if (result == 1) {
                 res.status(200).json({
                     status: 'success',
                     title: '¡ÉXITO!',
                     message: 'Usuario Eliminado Exitosamente',
                     resultado: result
                 })
             } else {
                 res.status(200).json({
                     status: 'error',
                     title: '¡ERROR!',
                     message: 'No se ha encontrado Usuario que desea Eliminar',
                     resultado: result
                 })
             }
         })
         .catch(err =>
             res.status(401).json({
                 status: 'error',
                 title: '¡ERROR!',
                 message: 'Error al Eliminar Usuario',
                 resultado: err
             })
         )*/
}


module.exports = {
    saveUser, //registrar usuario
    LogingUser, //login usuario
    updateUser, // actualizar datos de usuario
    updateLevantamientos,
    updateContinuos,
    updateFragmentados,
    list_user, // listar un usuario por id
    list_users, // listar todos los ususarios
    deleteUser
};