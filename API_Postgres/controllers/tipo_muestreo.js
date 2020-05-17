"use strict";
const Sequelize = require('sequelize');
var tipo_muestreo = require("../models/tipo_muestreo");
//var encabezado_levantamiento_flora = require("../models/encabezado_levantamiento_flora");
//var registro_levantamiento_flora = require('./registro_levantamiento_flora');
//var especie_flora = require("./especie_flora");
const Op = Sequelize.Op;

const relaciones = require("../models/relaciones");

//tipo_muestreo.hasMany(encabezado_levantamiento_flora,{foreignKey: 'id_espacio_muestreo'});
//encabezado_levantamiento_flora.belongsTo(tipo_muestreo,{foreignKey: 'id_espacio_muestreo'});

//encabezado_levantamiento_flora.hasMany(registro_levantamiento_flora,{foreignKey: 'id_encabezado_levantamiento_flora'});
//registro_levantamiento_flora.belongsTo(encabezado_levantamiento_flora,{foreignKey: 'id_encabezado_levantamiento_flora'});


function saveTipoMuestreo(req, res, next) {
    var parametros = req.body;
    const point = {
        type: "Point",
        coordinates: [parametros.latitud, parametros.longitud]
    };
    //console.log(parametros);
    tipo_muestreo
        .create({
            id_usuario: parametros.id_usuario,
            tipo_bosque: parametros.tipo_bosque,
            cod_espacio_muestreo: parametros.cod_espacio_muestreo,
            cant_transectas: 0,
            ubicacion_espacio_muestreo: point,
            id_grado_perturbacion: parametros.id_grado_perturbacion,
            latitud: parametros.latitud,
            longitud: parametros.longitud,
        })
        .then(t_m_registrado => {
            res.status(200).send({
                status: "success",
                title: '¡ÉXITO!',
                message: "Espacio Muestreo Registrado Con Éxito",
                resultado: t_m_registrado
            });
        })
        .catch(function (err) {
            res.status(401).send({
                status: "error",
                title: '¡ERROR!',
                message: "Error Al Registrar Espacio Muestreo",
                error: err.parent.detail
            });
        });
}

function updateTipoMuestreo(req, res) {
    var t_m_Id = req.params.id;
    var parametros = req.body;

    tipo_muestreo.update({
            tipo_bosque: parametros.tipo_bosque,
        }, {
            where: {
                id: t_m_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Espacio Muestreo Actualizado Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error Al Actualizar Espacio Muestreo',
                resultado: err.parent.detail
            })
        )
}

function updateTransectas(req, res) {
    var t_m_Id = req.params.id;
    var parametros = req.body;

    tipo_muestreo.update({
            cant_transectas: parametros.cant_transectas,
        }, {
            where: {
                id: t_m_Id
            }
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Cant Transectas incrementada Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error Al Actualizar Cant Transectas',
                resultado: err.parent.detail
            })
        )
}

function listTipoMuestreo(req, res, next) {
    var t_m_Id_U = parseInt(req.params.id_usuario);
    tipo_muestreo.findAll({
        where: {
            id_usuario: t_m_Id_U
        }
    }).then(t_m => {
        if (t_m) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: t_m
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Espacio Muestreo No Encontrado'
            });
        }
    })
}

function listIdTipoMuestreo(req, res, next) {
    var t_m_Id = parseInt(req.params.id);
    tipo_muestreo.findAll({
        where: {
            id: t_m_Id
        }
    }).then(t_m => {
        if (t_m) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: t_m
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Espacio Muestreo No Encontrado'
            });
        }
    })
}



function ReporteIndiceValorEconomio(req, res, next) {
    var t_m_Id = parseInt(req.params.id);
    var t_m_Id_U = parseInt(req.params.id_usuario);
    relaciones.User.findAll({
        where: {
          id:t_m_Id_U
        },
        include: [
          {
            model: relaciones.Espacio_Muestreo,
            where: { id:  t_m_Id},
            include: [{
                model: relaciones.Encabezado_Levantamiento_Flora,
                  as: 'Encabezado',
                include: [{
                  model: relaciones.Registro_Levantamiento_Flora, as: 'Registro',
                  //attributes:['id','id_especie_flora'],
                    required: true,
                    include: [{
                      model: relaciones.Especie_Flora, as: 'Especie',
                    //group: ['Especie.id_especie_flora'],
                      required: true,
                    }],

                }],
                required: false,
            }],
            required: false
        }]
    }).then(t_m => {
        if (t_m) {
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: t_m
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'Espacio Muestreo No Encontrado'
            });
        }
    })
}



function listsTipoMuestreo(req, res, next) {
    tipo_muestreo.findAll().then(tms => {
        if (tms) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: tms
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Espacio Muestreos Registrados'
            });
        }

    })
}

function deleteTipoMuestreo(req, res, next) {
    var id_t_m = parseInt(req.params.id);
    tipo_muestreo.destroy({
            where: {
                id: id_t_m
            },
        }).then(result =>
            res.status(200).json({
                status: 'success',
                title: '¡ÉXITO!',
                message: 'Espacio Muestreo Eliminado Con Éxito',
                resultado: result
            })
        )
        .catch(err =>
            res.status(401).json({
                status: 'error',
                title: '¡ERROR!',
                message: 'Error Al Eliminar Espacio Muestreo',
                error: err.parent.detail
            })
        )
}

function list2TipoMuestreo(req, res, next) {
    /*var id_user = parseInt(req.params.id_usuario);

    tipo_muestreo.findAll({
        where: {
            id_usuario: id_user
        }
    }).then(t_m => {
        if (t_m) {
            let enc_lev_fl = new Array();
            console.log('longitud arreglo: ', t_m.length)
            for (let p = 0; p <= t_m.length; p++) {
                if (p < t_m.length) {
                    encabezado_levantamiento_flora.findAll({
                        where: {
                            id_espacio_muestreo: t_m[p].id
                        },
                    }).then(e_l_f => {
                        if (e_l_f) {
                            this.enc_lev_fl[p] = e_l_f.resultado
                        } else {
                            res.status(404).send({
                                status: "error",
                                message: "Encabezado Levatamiento Flora no encontrada"
                            });
                        }
                    });
                    console.log('p:', p)
                } else if (p == t_m.length) {
                    console.log('p:', p);
                    console.log(enc_lev_fl);

                    /*res.status(200).json({
                        status: 'success',
                        title: '¡ÉXITO!',
                        resultado: enc_lev_fl
                    })
}
}
} else {
    res.status(404).send({
        status: 'error',
        title: '¡ERROR!',
        message: 'Espacio Muestreo No Encontrado'
    });
}
}) */
}

module.exports = {
    saveTipoMuestreo,
    listTipoMuestreo,
    listsTipoMuestreo,
    list2TipoMuestreo,
    listIdTipoMuestreo,
    updateTipoMuestreo,
    updateTransectas,
    deleteTipoMuestreo,
    ReporteIndiceValorEconomio
};
