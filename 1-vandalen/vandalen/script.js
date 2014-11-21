"use strict";


//Deklarerar variabler
var names;
var minAge;
var maxAge;
var totalAge;
var averageAge;
var agesOK;
var namesOK;

//Skapar variabel names med alla namn sorterade i bokstavsordning
var makePerson = function(persArr){
    
        var namesArray = [];
        persArr.map(function(arrayItem) {
             namesArray.push(arrayItem.name);
        });
        
        console.log(namesArray);
        
        namesArray.sort(function(a, b) { return a.localeCompare(b, 'sv')});
        
    
        names = namesArray.join(', ');
        
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
    

    //Datasträng som passeras in i funktionen makePerson
    var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
    
    console.log(data[0].name.indexOf(' '));

    //Felkontroll
    for (var i = 0, dataLength = data.length; i < dataLength; i++) {
        var obj = data[i];
        //Kollar om åldern är ett heltal
        if( (typeof obj.age === 'number') && (obj.age % 1 === 0) ) {
            agesOK = true;
        }
        else {
            agesOK = false;
            break;
        }
        
        //Kollar om namnet är en sträng med två namn
        if( (typeof obj.name === 'string') && (/\s/.test(obj.name)) ) {
            namesOK = true;
        }
        else {
            namesOK = false;
            break;
        }

    }
    
    console.log(agesOK);
    console.log(namesOK);
    
    if ((agesOK === true) && (namesOK === true)) {
        var person = makePerson(data);
        console.log(person);
    }
    else {
        var p = document.getElementById(".error"); // Referens till DOM-noden med class="error"
		var error = "Fel i ingående data!";
		var errorParagraph = document.createElement('p');
		errorParagraph.textContent = error;
		document.getElementById("messageHere").appendChild(errorParagraph);
    }
    
