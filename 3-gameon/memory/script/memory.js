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
ändra source till arrayId
skicka in första id i funktionen card1, 
ändra source till arrayId
*/

/* Skapar ett statiskt objekt */
var Memory = { 
    
    arrayId1: 0,
    
    arrayId2: 0,
    
    imgId1: 0,
    
    imgId2: 0,
    
    numberTries: 0,
    
    numberTotalTries: 0,
    
    numberSameCards: 0,
    
    numberTotalCards: 0,
    
    //Skapar en egenskap som refererar till den utslumpade arrayen
    randomArray: [],
    
    //Skapar en egenskap som håller koll på id för senast uppvända brickan
    idTurnedCard: 0,
    
    init: function() {
        
        var rows = 3;
        var cols = 4;
        
        Memory.numberTotalCards = (rows * cols)/2;

        this.randomArray = RandomGenerator.getPictureArray(rows,cols);
        
        var colsCount = 1;
        
        //Skriver ut en tabell om arrayens längd är större än 1
        if (this.randomArray.length > 0) {
            //Hämtar en referens till div-taggen där tabellen ska vara
            var tableDiv = document.getElementById("tableDiv");
            var tableHTML = "<table>";
            for (var i=1; i<this.randomArray.length+1; i++) {
                //Lägger till en tr-tagg om colsCount % cols = 0
                if (colsCount % cols === 1) {
                    tableHTML += "<tr>"; 
                }
                //Lägger till en td-tagg och numret
                var j = i-1;
                var arrayId = randomArray[j];
                tableHTML += "<td><a href=\"#\" onclick=\"Memory.changeImage("+i+","+arrayId+")\"><img src=\"pics/0.png\" id=\"card"+ i + "\" alt=\"Click me!\"></a></td>";
                
                
                //Lägger till en avslutande tr-tagg om colsCount % cols = 0
                if (colsCount % cols === 0) {
                    tableHTML += "</tr>"; 
                }

                colsCount++;
                
            }
            
            //Skriver ut tabellen
            tableDiv.innerHTML = tableHTML;
         
      
        }
    },
    
    //Skapar en funktion som sker onclick
    changeImage: function(imgId,arrayId) {
        
        //Kollar hur många brickor som har vänts
        //Om mindre än två brickor vänts, gör följande
        //alert(Memory.numberTries);
        if (Memory.numberTries < 2) {
            
            switch (Memory.numberTries) {
              case 0:
                Memory.arrayId1 = arrayId;
                Memory.imgId1 = imgId;
                Memory.numberTries = Memory.numberTries + 1;
                console.log("Memory.numberTries: " + Memory.numberTries);
                console.log("Memory.arrayId1: " + Memory.arrayId1);
                console.log("Memory.imgId1: " + Memory.imgId1);
                break;
              case 1:
                Memory.numberTotalTries = Memory.numberTotalTries + 1;
                Memory.arrayId2 = arrayId;
                Memory.imgId2 = imgId;
                Memory.numberTries = Memory.numberTries + 1;
                console.log("Memory.numberTries: " + Memory.numberTries);
                console.log("Memory.arrayId2: " + Memory.arrayId2);
                console.log("Memory.imgId2: " + Memory.imgId2);
                
                //Kolla om brickorna har samma id
                if (Memory.arrayId1 === Memory.arrayId2) {
                    //Räkna upp räknaren för antal drag med ett
                    Memory.numberSameCards = Memory.numberSameCards + 1;
                    //Kolla om alla brickorna är uppvända
                    
                    if (Memory.numberSameCards == Memory.numberTotalCards ) {
                        alert("Game over, you won. Number of tries: " + Memory.numberTotalTries);
                    }
                    
                }
                else {
                   //Kör changeImgBack för att sätta tillbaka 0.png på brickorna
                   console.log("Memory.imgId1 in different: " + Memory.imgId1);
                   console.log("Memory.imgId2 in different: " + Memory.imgId2);
                   Memory.changeImgBack(Memory.imgId1);
                   Memory.changeImgBack(Memory.imgId2);
                }
                
                Memory.numberTries = 0;
                break;
            }
            
        
            imgId = "card"+imgId;
            //console.log("imgId:" + imgId);
            
            var image = document.getElementById(imgId);
            var imgSrc = "pics/"+arrayId+".png";
            image.setAttribute("src",imgSrc);
            //console.log("imgSrc:" + imgSrc);
            
           
        }

        
        //Sätter id för senast vända brickan
        this.idTurnedCard = arrayId;
        this.previousTurnedCard = this.idTurnedCard;
    },
    
    //Skapar en funktion som sker onclick
    changeImgBack: function(imgId) {
        console.log("imgId in changeImgBack: "+imgId);
        //Skapar en timer som vänder tillbaka brickan om en sekund
        setTimeout(function() {
            console.log("imgId in setTimeOut: "+imgId);
            //Sätt bilden tillbaka till 0.png
            var imgName = "card" + imgId;
            
            var image = document.getElementById(imgName);
            var imgSrc = "pics/0.png";
            image.setAttribute("src",imgSrc);
            console.log("image: "+image);
        }, 1000);
        
    }
    
}



window.onload = Memory.init;