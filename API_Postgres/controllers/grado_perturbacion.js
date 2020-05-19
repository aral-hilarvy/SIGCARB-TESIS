"use strict";

var genero = require("../models/grado_perturbacion");

function listsGPerturbacion(req, res, next) {
    genero.findAll().then(g_perturb => {
        if (g_perturb) {
            res.status(200).send({
                status: 'success',
                title: '¡ÉXITO!',
                resultado: g_perturb
            });
        } else {
            res.status(404).send({
                status: 'error',
                title: '¡ERROR!',
                message: 'No hay Grados Perturbacion'
            });
        }

    })
}

module.exports = {
    listsGPerturbacion,
};