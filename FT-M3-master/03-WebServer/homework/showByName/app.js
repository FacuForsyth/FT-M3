var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http
.createServer((req, res) => {
    //res.end(req.url);

    fs.readFile('./images' + req.url + '.jpg', (err, img) => {
        if(err){
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.end('Imagen no encontrada');
        }else {
            res.writeHead(200, {'Content-text':'image/jpg'});
            res.end(img);
        }
    })
}).listen(1337, '127.0.0.1');

//en la terminal situarse en la carpeta /showByName - node app.js - abrir un navegador - localhost:1337 - y poner / nombre de la img q quiero
// o nodemon app.js (npm -g nodemon)