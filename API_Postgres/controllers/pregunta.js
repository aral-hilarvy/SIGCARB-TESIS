"use strict";

const Sequelize = require('sequelize');
var pregunta_encuesta = require("../models/pregunta");

const Op = Sequelize.Op;

function listPreguntasFaunaPag(req, res, next) {
    var num_pag = parseInt(req.params.num_pag);
    var tipo_encuesta = parseInt(req.params.tipo_encuesta);
    pregunta_encuesta.findAll({
        where: {
            num_pag: num_pag,
            [Op.and]: [{
                tipo_encuesta: tipo_encuesta
            }]
        }
    }).then(preguntas => {
        if (preguntas) {
            res.status(200).json({
                status: "success",
                resultado: preguntas
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Preguntas Fauna no encontrada"
            });
        }
    });
}

module.exports = {
    listPreguntasFaunaPag
};