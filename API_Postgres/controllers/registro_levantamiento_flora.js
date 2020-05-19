"use strict";

var registro_levantamiento_flora = require("../models/registro_levantamiento_flora");

function saveRegistro_Levatamiento_Flora(req, res, next) {
    var parametros = req.body;

    registro_levantamiento_flora
        .create({
            id_encabezado_levantamiento_flora: parametros.id_encabezado_levantamiento_flora,
            id_especie_flora: parametros.id_especie_flora,
            nro_estacion: parametros.nro_estacion,
            nro_cuadrante: parametros.nro_cuadrante,
            diametro_altura_pecho: parametros.diametro_altura_pecho,
            altura_maxima: parametros.altura_maxima,
            distancia: parametros.distancia,
            posicion_sociologica: parametros.posicion_sociologica,
            porcentaje_cobertura_gap_dosel: parametros.porcentaje_cobertura_gap_dosel,
            descripcion: parametros.observaciones,
            pendiente: parametros.pendiente,
        })
        .then(registro_L_F_registrado => {
            res.status(200).send({
                status: "success",
                message: "Registro Levatamiento Flora Creado",
                resultado: registro_L_F_registrado
            });
        })
        .catch(function (err) {
            res.status(404).send({
                status: "error",
                message: "Error al crear Registro Levatamiento Flora",
                error: err
            });
        });

}

function updateRegistro_Levatamiento_Flora(req, res) {
    var registroLF_Id = req.params.id;
    var parametros = req.body;

    registro_levantamiento_flora
        .update({
            id_encabezado_levantamiento_flora: parametros.id_encabezado_levantamiento_flora,
            id_especie_flora: parametros.id_especie_flora,
            nro_estacion: parametros.nro_estacion,
            nro_cuadrante: parametros.nro_cuadrante,
            diametro_altura_pecho: parametros.diametro_altura_pecho,
            altura_maxima: parametros.altura_maxima,
            distancia: parametros.distancia,
            posicion_sociologica: parametros.posicion_sociologica,
            porcentaje_cobertura_gap_dosel: parametros.porcentaje_cobertura_gap_dosel,
            descripcion: parametros.observaciones,
            pendiente: parametros.pendiente,
        }, {
            where: {
                id: registroLF_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                message: 'Registro Levatamiento Flora Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al actualizar Registro Levatamiento Flora',
                resultado: err
            })
        )
}

function listRegistro_Levatamiento_Flora(req, res, next) {
    var id_encabezado_levantamiento_fl = parseInt(req.params.id);
    registro_levantamiento_flora
        .findAll({
            where: {
                id_encabezado_levantamiento_flora: id_encabezado_levantamiento_fl
            },
            order: [
                ['id', 'ASC']
            ]
        }).then(result => {
            if (result) {
                res.status(200).json({
                    status: 'success',
                    resultado: result
                });
            } else {
                res.status(404).send({
                    status: 'error',
                    message: 'Registro Levatamiento Flora no encontrado'
                });
            }
        })
}

function listsRegistro_Levatamiento_Flora(req, res, next) {
    registro_levantamiento_flora
        .findAll().then(result => {
            if (result) {
                res.status(200).send({
                    status: 'success',
                    resultado: result
                });
            } else {
                res.status(404).send({
                    status: 'error',
                    message: 'No hay Registro Levatamiento Flora registrados'
                });
            }

        })
}

function deleteRegistro_Levatamiento_Flora(req, res, next) {
    var registroLF_Id = parseInt(req.params.id);
    registro_levantamiento_flora
        .destroy({
            where: {
                id: registroLF_Id
            },
        }).then(result => {
            if (result == 1) {
                res.status(200).json({
                    status: 'success',
                    message: 'Registro Levatamiento Flora Eliminado',
                    resultado: result
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'id de Registro Levatamiento Flora no existe',
                    resultado: result
                })
            }
        })
        .catch(err =>
            res.status(401).json({
                status: 'error',
                message: 'Error al Eliminar Registro Levatamiento Flora',
                resultado: err
            })
        )
}

module.exports = {
    saveRegistro_Levatamiento_Flora,
    listRegistro_Levatamiento_Flora,
    listsRegistro_Levatamiento_Flora,
    updateRegistro_Levatamiento_Flora,
    deleteRegistro_Levatamiento_Flora
};