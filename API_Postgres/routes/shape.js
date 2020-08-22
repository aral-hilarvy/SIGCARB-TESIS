"use strict";

var express = require("express");
var shapeFileController = require("../controllers/shapeFileController");

const multer = require('multer');
const path = require('path');
const uuid = require("uuid/v4");

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage,
    dest: path.join(__dirname, '../public/images'),
    fileFilter: (req, file, cb) => {
        /*const fileTypes = /zip|octet-stream|geo+json/;
        const mimeTypes = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        if (mimeTypes && extName) {
            return cb(null, true)
        }*/
        var ext = path.extname(file.originalname);
        if(ext == '.zip' || ext == '.geojson' || ext == '.shp') {
            return cb(null, true)
        }
        /*console.log(extName)
        console.log(mimeTypes)
        console.log(file.mimetype)
        console.log(path.extname(file.originalname))*/
        
        cb("Error: Archivo no Soportado")
    }
}).single('shape') //name del input

var api = express.Router();


api.post("/subir",upload, shapeFileController.subirShapefile);

module.exports = api;