'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    if(typeof executor !== "function") throw new TypeError('executor function');

    this._state = 'pending';

    this._handlerGroups = []; 
    //almacena [{sH1, eH1}, {sH2, eH2}, {...}...]

    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
    //va el .bind(this) para poder ejecutar el this._state y this._value
}

$Promise.prototype._internalResolve = function(value){
    if(this._state === 'pending'){
        this._state = 'fulfilled';
        this._value = value;
        this._callHandlers();   //que se ejecute cuando no sea pending
    }
}

$Promise.prototype._internalReject = function(value){
    if(this._state === 'pending'){
        this._state = 'rejected';
        this._value = value;
        this._callHandlers();   //que se ejecute cuando no sea pending
    }
}

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;

    const downstreamPromise = new $Promise(function(){

    })

    this._handlerGroups.push({successCb, errorCb, downstreamPromise});

    if(this._state !== 'pending') this._callHandlers();

    return downstreamPromise;

    //
}

$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length > 0){
    //si existe alguna informacion ( >0)  [{sH1, eH1}, {sH2, eH2}, ...]
        let current = this._handlerGroups.shift()   //quiero {sH1, eH1}
        if(this._state === 'fulfilled'){
            if(!current.successCb){
                //pB = pA.then(null,eH)
                current.downstreamPromise._internalResolve(this._value);
            }
            else{
                try{
                    const result = current.successCb(this._value); //throw error
                    //result = promiseZ
                    if(result instanceof $Promise){
                        result.then(
                            (value)=> current.downstreamPromise._internalResolve(value),
                            (err)=> current.downstreamPromise._internalReject(err)
                        );
                    }
                    else{
                        current.downstreamPromise._internalResolve(result);
                    }
                }   catch(e) {
                        current.downstreamPromise._internalReject(e);
                }
            }
            //current.successCb && current.successCb(this._value);
        }
        else if(this._state === 'rejected'){
            if(!current.errorCb){
                //pB = pA.then(null,eH)
                current.downstreamPromise._internalReject(this._value);
            }
            else{
                try{
                    const result = current.errorCb(this._value); //throw error
                    //result = promiseZ
                    if(result instanceof $Promise){
                        result.then(
                            (value)=> current.downstreamPromise._internalResolve(value),
                            (err)=> current.downstreamPromise._internalReject(err)
                        );
                    }
                    else{
                        current.downstreamPromise._internalResolve(result);
                    }
                }   catch(e) {
                        current.downstreamPromise._internalReject(e);
                }
            }
            //current.errorCb && current.errorCb(this._value);
        }
    }
}

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb);
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
