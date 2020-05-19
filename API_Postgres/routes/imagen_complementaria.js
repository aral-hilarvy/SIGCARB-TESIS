"use strict";

var express = require("express");
var ImagenCController = require("../controllers/imagen_complementaria");
const multer = require('multer');
const path = require('path');
const uuid = require("uuid/v4");

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

const upload = multer({
    storage,
    dest: path.join(__dirname, '../public/images'),
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|png|gif|jpg/;
        const mimeTypes = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        if (mimeTypes && extName) {
            return cb(null, true)
        }
        cb("Error: Archivo no Soportado")
    }
}).single('image') //name del input

var api = express.Router();
var middleware_a = require("../middlewares/autenticacion");

api.post("/registrar", [upload], ImagenCController.saveImgComplementaria);
api.get("/lists", ImagenCController.listsImgComplementaria);
api.put('/update/:id', [upload], ImagenCController.updateImgComplementaria);
api.get('/list/:id', ImagenCController.listImgComplementaria);
api.get('/list_user/:id_user', ImagenCController.listImgComplementariaUser);
api.get('/list_recurso/:id_recurso', ImagenCController.listImgComplementariaRecurso);
api.delete("/delete/:id", ImagenCController.deleteImgComplementaria);

module.exports = api;