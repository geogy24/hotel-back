# Hoteles

## Inicio

En la carpeta dump se encuentra el esquema de la base de datos que se debe restaurar y el usuario con el que se conecta la aplicación a MongoDB. En el archivo .env se encuentran los datos con los cuales se desea conectar la aplicación al MongoDB, en caso de cambios en la conexión dirigirse al archivo para su modificación.

### Prerequisitos

Debe instalar los siguientes paquetes para poder ejecutar la aplicación

- MongoDB versión 3.2.20 o superior
- npm versión 3.10.10 o superior
- node versión 6.13.1 o superior

```
sudo apt-get install -y mongodb-org
sudo apt-get install -y nodejs
sudo apt-get install -y npm
```

cree una base de datos y dentro de ella un usuario en mongodb que administre dicha base de datos, luego cambie las credenciales según el usuario creado y la contraseña dispuesta en el archivo .env de la carpeta raíz del proyecto

```
use hotels-backend
db.createUser(
   {
     user: "joredudiaz",
     pwd: "20d3s3pt13mbr3",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```

Importe la colección de datos de la siguiente manera.

```
mongoimport --db hotels-backend --collection hotels --file data.json --jsonArray
```

Para realizar la prueba de la aplicación en producción se adjunta en la carpeta dump el data.json con los datos a importar, incluyendo las imagenes en la carpeta public/uploads para su utilización; es importante que la colección a la que realice la importación se nombre "hotels".

en la carpeta raíz del proyecto instale mocha de forma global para ejecutar los test

```
sudo npm install -g mocha
```

### Instalando

Luego de clonar el repositorio, por medio de npm instale las dependencias

```
npm install
```

Ejecute la aplicación de la siguiente manera, esta ya se encuentra con la variable de entorno ENV_NODE establecida en producción.

```
set DEBUG=hotels-backend & npm start
```

!IMPORTANTE¡
La aplicación acepta peticiones unicamente del front desde http://localhost:4200 (modo desarrollo) en caso que ejecute el front hecho en angular en modo producción debe cambiar la variable de entorno ORIGIN en el archivo .env por http://localhost o el nombre de dominio desde la cual se estan haciendo las peticiones

## Ejecute las pruebas

La aplicación cuenta con unas pocas pruebas que aseguran la fiabilidad de la misma, para que se ejecuten las pruebas en la carpeta raíz de la aplicación ejecute el comando mocha; este comprobará que la configuración anterior se encuentra en perfecto estado y que puede utilizar la aplicación normalmente.

```
npm install -g mocha
```

## Despliegue


## Construido con

* [Expressjs](expressjs.com/es/) - Web Framework usado
* [Nodejs](https://nodejs.org/es/) - Dependencia

## Contribución

## Versionado

## Autores

* **Jorge Eduardo Díaz Leytón**

## Licencia

MIT License

Copyright (c) 2020 Jorge Díaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
