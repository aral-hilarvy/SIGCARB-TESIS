"use strict";

var observacion_fauna = require("../models/observacion_fauna");

function saveObservacionFauna(req, res, next) {
    var parametros = req.body;

    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };

    observacion_fauna
        .create({
            id_especie_fauna: parametros.id_especie_fauna,
            id_encabezado_levantamiento_fauna: parametros.id_encabezado_levantamiento_fauna,
            fecha: parametros.fecha,
            hora: parametros.hora,
            latitud: parametros.latitud,
            longitud: parametros.longitud,
            microhabitat: parametros.microhabitat,
            actividad: parametros.actividad,
            comentarios_observaciones: parametros.comentarios_observaciones,
            muestra_fauna: point
        })
        .then(ob_fauna => {
            res.status(200).send({
                status: "success",
                message: "Observacion Fauna Creado",
                resultado: ob_fauna
            });
        })
        .catch(function (err) {
            res.status(200).send({
                status: "error",
                message: "Error al crear Observacion Fauna",
                error: err.parent.detail
            });
        });
}

function updateObservacionFauna(req, res) {
    var ob_fauna_Id = req.params.id;
    var parametros = req.body;
    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };
    observacion_fauna.update({
            id_especie_fauna: parametros.id_especie_fauna,
            id_encabezado_levantamiento_fauna: parametros.id_encabezado_levantamiento_fauna,
            fecha: parametros.fecha,
            hora: parametros.hora,
            latitud: parametros.latitud,
            longitud: parametros.longitud,
            microhabitat: parametros.microhabitat,
            actividad: parametros.actividad,
            comentarios_observaciones: parametros.comentarios_observaciones,
            muestra_fauna: point
        }, {
            where: {
                id: ob_fauna_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Observacion Fauna Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(404).json({
                status: 'error',
                message: 'Error al actualizar Observacion Fauna',
                resultado: err
            })
        )
}

function listObservacionFauna(req, res, next) {
    var id_ob_fauna = parseInt(req.params.id);
    observacion_fauna.findById(id_ob_fauna).then(obs_fauna => {
        if (obs_fauna) {
            res.status(200).json({
                status: 'success',
                resultado: obs_fauna
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Observacion Fauna no encontrado'
            });
        }
    })
}

function listsObservacionFauna(req, res, next) {
    observacion_fauna.findAll().then(obs_fauna => {
        if (obs_fauna) {
            res.status(200).send({
                status: 'success',
                resultado: obs_fauna
            });
        } else {
            res.status(200).send({
                status: 'error',
                message: 'No hay Observacion Fauna registrados'
            });
        }

    })
}

function deleteObservacionFauna(req, res, next) {
    var id_ob_faun = parseInt(req.params.id);
    observacion_fauna.destroy({
            where: {
                id: id_ob_faun
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Observacion Fauna Eliminado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Observacion Fauna',
                resultado: err
            })
        )
}

module.exports = {
    saveObservacionFauna,
    listObservacionFauna,
    listsObservacionFauna,
    updateObservacionFauna,
    deleteObservacionFauna
};