"use strict";

/*
Mindre än två vända brickor:
Lagra första brickans id
Ändra utseendet på första brickan
Lagra andra brickans id
Ändra utseendet på andra brickan

Två vända brickor:
Kolla om id är samma
Om id är samma, kör inte timer som vänder tillbaka
Om id inte är samma, kör timer-funktion
skicka in första id i funktionen card1, 
ändra source till turnedId
skicka in första id i funktionen card1, 
ändra source till turnedId
*/

/* Skapar ett statiskt objekt */
var Memory = { 
    
    numberTries: 0,
    

    
    //Den utslumpade arrayen
    randomArray: [],
    
    //Array som håller den skapade spelplanen
    memoryArray: [],
    
    //Array som håller de två senast vända korten
    turnedCardIds: [],
    
    
    init: function() {

        var rows = 4;
        var cols = 4;
        
        var body = document.querySelector("body");

        body.addEventListener("click", function (e) {
            e = e || event;
            if (e.target.className === "memorybrick") {
                
                //Lägger till ett försök till numberTries
                Memory.numberTries++;
                
                console.log("Numbertries: " + Memory.numberTries);
                
                e.preventDefault();
                
                Memory.changeImage(e);
                Memory.writeMemory(memoryArray,rows,cols);
                
                //Kollar längden på turnedCardIds.
                if (Memory.turnedCardIds.length < 2) {
                    var arrayCard = [];
                    //Hämtar bildens position
                    var imgId = e.target.id.substring(4);
                    arrayCard[0] = imgId;
                    arrayCard[1] = Memory.memoryArray[imgId][0];
                    Memory.turnedCardIds.push(arrayCard);
                    //alert("arrayCard[0]: " + arrayCard[0] + " arrayCard[1]: " + arrayCard[1]);
                    
                    
                }
                if (Memory.turnedCardIds.length === 2) {
                    var turnedId1 = Memory.turnedCardIds[0][1];
                    var turnedId2 = Memory.turnedCardIds[1][1];
                    //alert("turnedId1: " + turnedId1 + " turnedId2: " + turnedId2);
                    if (turnedId1 === turnedId2) {
                        Memory.turnedCardIds.length = 0;
                    }
                    else {
                        //Vänder tillbaka korten efter en sekund
                        setTimeout(function() {
                            var imgId1 = Memory.turnedCardIds[0][0];
                            var imgId2 = Memory.turnedCardIds[1][0];
                            //Ändrar korten i memoryArray så de inte är vända
                            Memory.memoryArray[imgId1][1] = 0;
                            Memory.memoryArray[imgId2][1] = 0;
                            Memory.writeMemory(memoryArray,rows,cols);
                            Memory.turnedCardIds.length = 0;
                        }, 1000);
                        
                    }
                    
                    //Skapar en variabel som håller om det fortfarande finns ovända kort
                    var unturnedCards = 0;
                    
                    //Letar igenom arrayen för att se om alla kort är vända nu
                    for (var i=0; i<Memory.memoryArray.length; i++) {
                        var turnedId = Memory.memoryArray[i][1];
                        if (turnedId === 0) {
                            unturnedCards++;
                        }
                        
                    }
                    
                    if (unturnedCards === 0) {
                        Memory.alertGameOver();
                    }
                }
                
                
            } 
            else {
                console.log("Didn't work");
            }
        }, false);
        
        
        
        Memory.numberTotalCards = (rows * cols)/2;

        //this.randomArray = RandomGenerator.getPictureArray(rows,cols);
    
        //Skapar en spelplan i memoryArray
        var memoryArray = Memory.createArray(rows,cols);
        Memory.memoryArray = memoryArray;
        
        //Skriver ut en tabell om arrayens längd är större än 1
        if (memoryArray.length > 0) {
            Memory.writeMemory(memoryArray,rows,cols);
        }
        else {
            console.log("Ingen spelplan skapades");
        }
    },
    
    alertGameOver: function() {
        alert("Game over, you won. Number of tries: " + Memory.numberTries);
    },
    
    checkMemory: function(memoryArray) {
        //Skapar array som håller om antalet vända kort är två,
        //och om korten i så fall är likadana
        var checkedArray = [];
        checkedArray.push(false,false);
        
        //Skapar array som håller id för de vända korten
        var turnedCardIds = [];
        
        //Loopar igenom memoryArray och kollar om det finns två eller fler vända brickor
        for (var i=0; i<memoryArray.length; i++) {
            var arrayCard = memoryArray[i];
            
            //Hämtar ut värdena från arrayCard
            var turnedId = arrayCard[0];
            var isClicked = arrayCard[1];
            
            if (isClicked === 1) {
                turnedCardIds.push(turnedId); 
            }
        
        }
        
        if (turnedCardIds.length === 2) {
            checkedArray[0] = true;
            //Jämför id 
            if (turnedCardIds[0] === turnedCardIds[1]) {
                checkedArray[1] = true;
            }
        }


        return checkedArray;
    },
    

    
    createArray: function(rows,cols) {

        var randomArray = RandomGenerator.getPictureArray(rows,cols);
        
        var memoryArray = [];
        
        //Skapar en ny array för spelplanen
        for (var i=0; i<randomArray.length; i++) {
            
            //Lägg in det nuvarande värdet i arrayen plus en nolla (icke vänt kort)
            //Skapa en ny array
            var arrayCard = [randomArray[i],0];
            
            memoryArray[i] = arrayCard;
        }
        
        
        for (var j=0; j<memoryArray.length; j++ ) {
            console.log(j + ": ");
            //Hämtar ut arrayen ur memoryArray
            arrayCard = memoryArray[j];
            for (var k=0; k<arrayCard.length;k++) {
                console.log(j + "." + k + ": " + arrayCard[k]);
            }
        }
        
        return memoryArray;
        
    },
    
    //Skriver ut tabellen med memorybrickor
    writeMemory: function(memoryArray,rows,cols) {
        var colsCount = 1;
        var tableHTML = "<table>";
        for (var i=1; i<memoryArray.length+1; i++) {
            //Lägger till en tr-tagg om colsCount % cols = 0
            if (colsCount % cols === 1) {
                tableHTML += "<tr>"; 
            }
            
            //Lägger till en td-tagg och numret
            var j = i-1;
            var arrayCard = memoryArray[j];
            
            //Hämtar ut värdena från arrayCard
            var turnedId = arrayCard[0];
            var isClicked = arrayCard[1];
            
            tableHTML += "<td><img src=\"pics/";
            if (isClicked === 0) {
                tableHTML +="0";
            }
            else {
                tableHTML +=turnedId;
            }
            tableHTML += ".png\" class=\"memorybrick\" id=\"card"+ j + "\" alt=\"Click me!\"></td>";
            
            //Lägger till en avslutande tr-tagg om colsCount % cols = 0
            if (colsCount % cols === 0) {
                tableHTML += "</tr>"; 
            }

            colsCount++;
        }
        
        //Skriver ut tabellen
        var tableDiv = document.getElementById("tablediv");
        tableDiv.innerHTML = tableHTML;
    },
    
    changeImage: function(e) {
        //Hämtar bildens position
        var imgId = e.target.id.substring(4);
        //alert("imgId:" + imgId);
        
        //Hämtar den vända bildens id
        //Hämtar kortet från spelplansarrayen
        var arrayCardGet = Memory.memoryArray[imgId];
        var arrayCardId = arrayCardGet[0];
        var arrayCard = [arrayCardId,1];
        console.log("arrayCardId: " + arrayCardId);
        
        //Ändrar isClicked till 1 i arrayen
        Memory.memoryArray[imgId] = arrayCard;
    }
    
};



window.onload = Memory.init;