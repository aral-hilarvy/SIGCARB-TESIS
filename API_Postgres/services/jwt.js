'use strict'

var jwt = require('jwt-simple');
var moment= require('moment');
var secret='clave_secreta_token';

exports.createToken =(user)=>{
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    }
    return jwt.encode(payload,secret);//le asigna una clave secreta al objeto  payload
};