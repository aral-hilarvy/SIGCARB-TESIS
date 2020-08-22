'use strict'
var fs = require('fs');

function subirShapefile(req, res, next) {
    let file = req.file;
    let data_res=null
    let nombre_archivo=''
    let ext=''
    let obj_res=null
    if( file.originalname.split('.')[1] == 'geojson'){
       
        /*obj_res= fs.readFile('./public/images/'+file.originalname, 'utf8', function (err, data) {
            if (err) throw err; // we'll not consider error handling for now
            data_res = JSON.parse(data);
            nombre_archivo=file.originalname;
            ext='geojson';
            console.log(data_res)
            obj_res={'data_res':data_res,'nombre_archivo':nombre_archivo,'ext':ext}
            return {'data_res':data_res,'nombre_archivo':nombre_archivo,'ext':ext}
        });*/
        data_res = JSON.parse(fs.readFileSync('./public/images/'+file.originalname, 'utf8'));
        nombre_archivo=file.originalname;
        ext='geojson';
        console.log(data_res)
        obj_res={'data_res':data_res,'nombre_archivo':nombre_archivo,'ext':ext}
        console.log(obj_res)
    }else if( file.originalname.split('.')[1]== 'shp'){
        
        nombre_archivo= file.originalname.split('.')[0];
        ext='shp';
        obj_res = {'data_res':data_res,'nombre_archivo':nombre_archivo,'ext':ext}
    }else{
        nombre_archivo= file.originalname;
        ext='zip';
        obj_res = {'data_res':data_res,'nombre_archivo':nombre_archivo,'ext':ext}
    }
    console.log(file);
            res.status(200).send({
                status: "success",
                message: "Archivo subido con exito",
                uri:'http://localhost:3978/images/'+ nombre_archivo,
                obj_res 
            });   
}

module.exports = {
    subirShapefile,
};