"use strict";

var genero = require("../models/genero");

function saveGenero(req, res, next) {
    var parametros = req.body;

    genero
        .create({
            id_familia: parametros.id_familia,
            nombre: parametros.nombre,
            descripcion: parametros.descripcion
        })
        .then(genero_registrado => {
            res.status(200).send({
                status: "success",
                title: '¡ÉXITO!',
                message: "Género Registrado Con Éxito",
                resultado: genero_registrado
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                title: '¡ERROR!',
                message: "Error al Registrar Género",
                error: err
            });
        });
}

function updateGenero(req, res) {
    var genero_Id = req.params.id;
    var parametros = req.body;

    genero.update({
            id_familia: parametros.id_familia,
            nombre: parametros.nombre,
            descripcion: parametros.descripcion
        }, {
            where: {
                id: genero_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Género Actualizado Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Actualizar Género',
                resultado: err
            })
        )
}

function listGenero(req, res, next) {
    var genero_Id = parseInt(req.params.id);
    genero.findById(genero_Id).then(genero => {
        if (genero) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: genero
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Género no encontrado'
            });
        }
    })
}

function listsGenero(req, res, next) {
    genero.findAll().then(generos => {
        if (generos) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: generos
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Géneros Registrado'
            });
        }

    })
}

function deleteGenero(req, res, next) {
    var id_genero = parseInt(req.params.id);
    genero.destroy({
            where: {
                id: id_genero
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Género Eliminado Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Eliminar Género',
                resultado: err
            })
        )
}

module.exports = {
    saveGenero,
    listGenero,
    listsGenero,
    updateGenero,
    deleteGenero,
};