"use strict";

var grupo_f = require("../models/grupo_funcional");
var especie_flora = require("../models/especie_flora");
var genero = require("../models/genero");
var familia = require("../models/familia");

function saveGrupoFuncional(req, res, next) {
    var parametros = req.body;

    grupo_f
        .create({
            id_especie_flora: parametros.id_especie_flora,
            sindrome_dispersion: parametros.sindrome_dispersion,
            estado_sucesional: parametros.estado_sucesional,
            periocidad_hoja: parametros.periocidad_hoja,
            nro_coleccion: parametros.nro_coleccion,
            descripcion_ubicacion: parametros.descripcion_ubicacion
        })
        .then(grupo_funcional => {
            res.status(200).send({
                status: "success",
                title: '¡ÉXITO!',
                message: "Grupo Funcional Creado",
                resultado: grupo_funcional
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                title: '¡ERROR!',
                message: "Error al crear Grupo Funcional",
                error: err
            });
        });
}

function updateGrupoFuncional(req, res) {
    var grupo_funcional_Id = req.params.id;
    var parametros = req.body;

    grupo_f.update({
            id_especie_flora: parametros.id_especie_flora,
            sindrome_dispersion: parametros.sindrome_dispersion,
            estado_sucesional: parametros.estado_sucesional,
            periocidad_hoja: parametros.periocidad_hoja,
            nro_coleccion: parametros.nro_coleccion,
            descripcion_ubicacion: parametros.descripcion_ubicacion
        }, {
            where: {
                id: grupo_funcional_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Grupo Funcional Actualizado',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al actualizar Grupo Funcional',
                resultado: err
            })
        )
}

function listGrupoFuncional(req, res, next) {
    var grupo_funcional_Id = parseInt(req.params.id);
    grupo_f.findById(grupo_funcional_Id).then(grupo_funcional => {
        if (grupo_funcional) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: grupo_funcional
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Grupo Funcional no encontrado'
            });
        }
    })
}

function listsGrupoFuncional(req, res, next) {
    grupo_f.findAll().then(grupo_funcional => {
        if (grupo_funcional) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: grupo_funcional
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Grupo Funcional registrado'
            });
        }

    })
}

function listsGrupoFuncionalF(req, res, next) {
    grupo_f.findAll(
      {
        include: [{
          model:especie_flora,
          include: [{
            model: genero,
            include: [{
              model: familia,
            }]
          }]
        }]
      }
    ).then(grupo_funcional => {
        if (grupo_funcional) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: grupo_funcional
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Grupo Funcional registrado'
            });
        }

    })
}

function deleteGrupoFuncional(req, res, next) {
    var id_grupo_funcional = parseInt(req.params.id);
    grupo_f.destroy({
            where: {
                id: id_grupo_funcional
            },
        }).then(result => {
            if (result == 1) {
                res.status(200).json({
                    status: 'success',
                    title: '¡ÉXITO!',
                    message: 'Grupo Funcional Eliminado',
                    resultado: result
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'No encontró Grupo Funcional para ser Eliminado',
                    resultado: result
                })
            }

        })
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error al Eliminar Grupo Funcional',
                resultado: err
            })
        )
}

module.exports = {
    saveGrupoFuncional,
    listGrupoFuncional,
    listsGrupoFuncional,
    listsGrupoFuncionalF,
    updateGrupoFuncional,
    deleteGrupoFuncional
};
