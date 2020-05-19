"use strict";

var img_complementaria = require("../models/imagen_complementaria");
var usuario = require("../models/user");
var fs = require('fs');


function saveImgComplementaria(req, res, next) {
    var parametros = req.body;
    let file = req.file;
    console.log(file);
    console.log(parametros);
    img_complementaria
        .create({
            id_usuario: parametros.id_usuario,
            nombre_imagen: parametros.nombre_imagen,
            año: parametros.año,
            descripcion_imagen: parametros.descripcion_imagen,
            identificador: file.filename
        })
        .then(img_comp_registrada => {
            res.status(200).send({
                status: "success",
                message: "Imagen Complementaria Creada",
                resultado: img_comp_registrada
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                message: "Error al crear Imagen Complementaria",
                error: err
            });
        });
}

function updateImgComplementaria(req, res) {
    var Img_Id = req.params.id;
    var parametros = req.body;
    let file = req.file;
    console.log(file)
    let uppdd
    img_complementaria.findById(Img_Id).then(img => {
        if (img) {
            if (file) {
                uppdd = {
                    id_usuario: parametros.id_usuario,
                    nombre_imagen: parametros.nombre_imagen,
                    año: parametros.año,
                    descripcion_imagen: parametros.descripcion_imagen,
                    identificador: file.filename
                }
            } else {
                uppdd = {
                    id_usuario: parametros.id_usuario,
                    nombre_imagen: parametros.nombre_imagen,
                    año: parametros.año,
                    descripcion_imagen: parametros.descripcion_imagen
                }
            }
            img_complementaria
                .update(
                    uppdd, {
                        where: {
                            id: Img_Id
                        }
                    })
                .then(result => {
                    if (file && result == 1) {
                        fs.unlinkSync('./public/images/' + img.identificador);
                    }
                    res.status(200).json({
                        status: "success",
                        message: "Imagen Complementaria Actualizada",
                        resultado: result
                    })
                })
                .catch(err =>
                    res.status(401).json({
                        status: "error",
                        message: "Error al actualizar Imagen Complementaria",
                        resultado: err.parent.detail
                    })
                );
        } else {
            res.status(404).send({
                status: "error",
                message: "Imagen Complementaria no encontrada"
            });
        }
    })
}

function listImgComplementaria(req, res, next) {
    var img_Id = parseInt(req.params.id);
    img_complementaria.findById(img_Id).then(img => {
        if (img) {
            res.status(200).json({
                status: "success",
                resultado: img
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Imagen Complementaria no encontrada"
            });
        }
    });
}

function listImgComplementariaUser(req, res, next) {
    var user_Id = parseInt(req.params.id_user);
    img_complementaria.findAll({
        where: {
            id_usuario: user_Id
        }
    }).then(img => {
        if (img) {
            res.status(200).json({
                status: "success",
                resultado: img
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Imagen Complementaria no encontrada"
            });
        }
    });
}

function listImgComplementariaRecurso(req, res, next) {
    var recurso_Id = parseInt(req.params.id_recurso);


    usuario.findAll({
        where: {
            id_recurso_natural: recurso_Id
        }
    }).then(usuarios => {
        if (usuarios) {
            let users = [];
            for (let i = 0; i < usuarios.length; i++) {
                users[i] = usuarios[i].id;
            }
            img_complementaria.findAll({
                where: {
                    id_usuario: users
                }
            }).then(img => {
                if (img) {
                    res.status(200).json({
                        status: "success",
                        resultado: img
                    });
                } else {
                    res.status(404).send({
                        status: "error",
                        message: "Imagen Complementaria no encontrada"
                    });
                }
            });


        } else {
            res.status(404).send({
                status: "error",
                message: "Usuarios no Encontrados"
            });
        }
    });


    /*img_complementaria.findAll({
        where: {
            id_usuario: user_Id
        }
    }).then(img => {
        if (img) {
            res.status(200).json({
                status: "success",
                resultado: img
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Imagen Complementaria no encontrada"
            });
        }
    });*/
}


function listsImgComplementaria(req, res, next) {

    img_complementaria.findAll().then(img => {
        if (img) {
            res.status(200).send({
                status: "success",
                resultado: img
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "No hay Imagen Complementaria registradas"
            });
        }
    });
}


function deleteImgComplementaria(req, res, next) {
    var id_img = parseInt(req.params.id);

    img_complementaria.findById(id_img).then(img => {
        if (img) {
            img_complementaria
                .destroy({
                    where: {
                        id: id_img
                    }
                })
                .then(result => {

                    fs.unlinkSync('./public/images/' + img.identificador);
                    res.status(200).json({
                        status: "success",
                        message: "Imagen Complementaria Eliminada",
                        resultado: result
                    });
                })
                .catch(err =>
                    res.status(401).json({
                        status: "error",
                        message: "Error al Eliminar Imagen Complementaria",
                        resultado: err
                    })
                );
        } else {
            res.status(404).send({
                status: "error",
                message: "Imagen Complementaria no encontrada"
            });
        }
    })
}

module.exports = {
    saveImgComplementaria,
    listImgComplementaria,
    listImgComplementariaUser,
    listImgComplementariaRecurso,
    listsImgComplementaria,
    updateImgComplementaria,
    deleteImgComplementaria
};