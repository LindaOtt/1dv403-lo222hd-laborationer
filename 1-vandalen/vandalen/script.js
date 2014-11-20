"use strict";

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

//Deklarerar variabler
var names;
var minAge;
var maxAge;
var totalAge;
var averageAge;



//Skapar variabel names med alla namn sorterade i bokstavsordning
var makePerson = function(persArr){
    
    //Sorterar arrayen efter namn
    /*
    persArr.sort(function (a, b) {
      return a.name > b.name ? 1 : -1 || 0;
    });
    */
    
    //'ä'.localeCompare('z', 'sv')
    
    var namesArray = [];
    persArr.map(function(arrayItem) {
         namesArray.push(arrayItem.name);
    });
    
    console.log(namesArray);
    
    //persArr.sort(function(a, b) { return a.age.localeCompare(b.age, 'sv') });
    namesArray.sort(function(a, b) { return a.localeCompare(b, 'sv')});
    

    /*
    var names = "";
    var age = 0;
    persArr.forEach( function (arrayItem)
    {
        names += (age === 0) ? "": ", ";
        names += arrayItem.name;
        age = arrayItem.age;
    });
    */

    var names = namesArray.join(', ');
    
    console.log(names);
    
    //Skapar variabel minAge som innehåller den ålder som är lägst
    //Sorterar arrayen efter ålder
    persArr.sort(function (a, b) {
      return a.age > b.age ? 1 : -1 || 0;
    });
    
    minAge = persArr[0].age;
    console.log(minAge);  
    
    //Skapar variabel maxAge som innehåller den ålder som är högst
    //Sorterar arrayen efter ålder
    persArr.sort(function (a, b) {
      return a.age > b.age ? -1 : 1 || 0;
    });
    
    maxAge = persArr[0].age;
    console.log(maxAge);  


    //Skapar variabel totalAge som innehåller alla åldrarna adderade
    totalAge = persArr.reduce(function (a, b) {
      return {age: a.age + b.age}; // returnerar objekt med egenskap age
      //Reduce tar in en funktion för att utföra operationer på varje element i en array. 
      //Varje gång den returnerar ett värde som används som nästa 'a' variabel i operationen. 
      //Första iteration a = {x:1}, b = {x:2} 
      //Andra iteration a = {x:3} (kombinerat värde av första iterationen), b = {x:4}. The problem with your example in the second iteration it was trying to add 3.x + b.x, 3 does not have a property called x so it returned undefined and adding that to b.x (4) returned Not a Number 
    })
    console.log(totalAge.age);
    
    //Skapar variabel averageAge som innehåller medelvärdet av åldrarna
    var dataLength = persArr.length;
    totalAge = totalAge.age;
    
    averageAge = Math.round(totalAge / dataLength);
    console.log(averageAge);


    //Objekt som returneras
    var returnObj = {
        minAge: minAge,
        maxAge: maxAge,
        averageAge: averageAge,
        names: names
    };
    
    return returnObj;

}

var person = makePerson(data);
console.log(person);






