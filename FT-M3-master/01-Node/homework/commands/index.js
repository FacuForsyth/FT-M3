let fs = require('fs');     //no necesita instarlo, para el paso de ls
//let request = require('request');  // no necesita install

module.exports = {
    echo: function(args, print){
        print(args.join(" "));
    },
    date: function(args, print){
        print(Date())   //muestra el dia y fecha
    },
    ls: function(args, print){
        fs.readdir('.', function(err, files){
            if(err) throw err;
            print(files.join('\n'));    //files es un arreglo y lo paso a string donde /n lo separa
        })
        //readdir - leer directorio - '.' seria la primera carpeta, despues callback
    },
    pwd: function(args, print){
        print(process.cwd());
    },
    //me dice donde estoy parado, la ruta - print working directory
    
    cat: function(args, print){
    //muestra el contenido de un archivo
        fs.readFile(args[0], 'utf-8', function(err, data){
            if(err) throw err;
            print(data);
        })
    },
    head: function(args, print){
        fs.readFile(args[0], 'utf-8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(0, 10).join('\n'));
        })
    },
    tail: function(args, print){
        fs.readFile(args[-10], 'utf-8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(0, 10).join('\n'));
        })
    },
    curl: function(args, print){
        request(args[0], function(err, data){
            if(err) throw err;
            print(data.body);
        })
    }

}