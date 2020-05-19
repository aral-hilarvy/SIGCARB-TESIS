'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_token';

exports.ensureAuth = function (req, res, next) {

    if (!req.headers.authorization)
        return res.status(403).send({
            status: 'error',
            messaje: 'la peticion no posee una cabecera valida de autenticacion'
        })

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment.unix())
            return res.status(401).send({
                status: 'error',
                messaje: 'Token Expirado'
            })
    } catch (ex) {
        console.log(ex);
        return res.status(401).send({
            status: 'error',
            messaje: 'Token no Valido'
        })
    }
    req.user = payload;
    next(); //se usa porque a veces se encadenan los middlewarer
};