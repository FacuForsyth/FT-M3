function sumArray(array, num){
    if(!Array.isArray(array)) {throw new TypeError("array")}
    if(typeof num !== 'number') {throw new TypeError('number')}
    //evaluar si hay 2 num dentro del arreglo que sumen num
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j < array.length; j++) {
            if(array[i] + array[j] === num) return true;
        }
    }
    return false;
}

function pluck(array, prop){
    return array.map(p => p[prop])
    //con map retorna un arreglo con prop que es name
}

module.exports = {sumArray, pluck};