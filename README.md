# TESIS-SIGCARB

Proyecto de sig web  para el estudio de la Cuenca del rio Botanamo.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Node.js_
_Postgres SQL_
_Postgis (Complemento de postgres para el uso de datos geograficos)_


### Instalación 🔧

_Desgargar el zip del proyecto del repositorio o en su defecto clonarlo con _

```
    git clone https://github.com/aral-hilarvy/SIGCARB-TESIS.git
```

_crear una base de datos en postgres con el nombre de:_

```
 gisdata
```

_importar el backup ubicado en el directorio:_

```
 API_Postgres/DB/gisdata.backup
```

_Ubicarse dentro de la carpeta del proyecto desde la terminal o cdm  e instalar las dependencias_

```
 npm i
```

_Ubicarse dentro de la carpeta API_Postgres y cambiar los datos de conexion editando el archivo conection.js _

```
const db = new Sequelize('postgresql://NOMBREUSUARIODB:CLAVEDB@localhost:5432/gisdata');
```

_En donde: NOMBREUSUARIODB es el usuario de su db y CLAVEDB es la clave de su bd_

_Ubicarse desde la terminal en el directorio API_Postgres/ y arrancar el servidor con el comando:_

```
 npm start
```

## Ejecucion 📦

_abrir en el navegador los archivos:_

```
 CARB/index.html (para ver las funciones del usuario comun que no necesita hacer login)
```
```
 CARB/html_login/login.html (para ver el inicio de sesion)
```

_Usuarios de pruebas:_

```
 Usuario Administrador-> User: jperez10  Clave:123
```
```
 Usuario Comun-> User: lpsecur_  Clave:123
```
```
 Usuario Comun-> User: amarq2  Clave:123
```

## Autores ✒️

* **Hilarvy Lara** - *Trabajo Completo* - [aral-hilarvy](https://github.com/aral-hilarvy)

## Licencia 📄

Este proyecto está bajo la Licencia (MIT) 
