'use strict'
var data = require("../models/map");
const Sequelize = require('sequelize');
var Datos_Cobertura = require("../models/shape");

const Op = Sequelize.Op;

function listJson(req, res, next) {
    let map = data;
    res.status(200).send({
        status: 'success',
        title: '¡ÉXITO!',
        resultado: map
    });
}

function listsDatosCobertura(req, res, next) {
    var anio = parseInt(req.params.anio);
    Datos_Cobertura.findAll({
        where: {
            anio: anio
        }
    }).then(datas => {
        if (datas) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: datas
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Datos Cobertura'
            });
        }

    })
}

function listsDatosCoberturaBosque(req, res, next) {
    Datos_Cobertura.findAll({

        where: {
            [Op.or]: [{
                id_subtipo_cobertura: 1
            }, {
                id_subtipo_cobertura: 2
            }]
        }
    }).then(datas => {
        if (datas) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: datas
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Datos Cobertura'
            });
        }

    })
}

function listsDatosCoberturaAnios(req, res, next) {
    Datos_Cobertura.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('anio')), 'anio']
        ],
    }).then(datas => {
        if (datas) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: datas
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Datos Cobertura'
            });
        }

    })
}

module.exports = {
    listJson,
    listsDatosCobertura,
    listsDatosCoberturaBosque,
    listsDatosCoberturaAnios
};
