"use strict";

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var makePerson = function(persArr){
    
    
    /*
    function logArrayElements(obj) {
        Object.keys(obj).forEach(function (key) {
            var foo = obj[key];
            alert(foo);
        });
    }
        
    persArr.forEach(logArrayElements);
    */
    
    var names = "";
    persArr.forEach( function (arrayItem)
    {
        names += arrayItem.name;
        names += ", ";
    });
    
    return names;
    
    /*
    //Objekt som returneras
    var returnObj = {
        minAge: 36,
        maxAge: 46,
        averageAge: 40,
        names: "Johan Leitet, John Häggerud, Mats Loock"
    };
    
    return returnObj;
    */
}

var result = makePerson(data);

console.log(result);