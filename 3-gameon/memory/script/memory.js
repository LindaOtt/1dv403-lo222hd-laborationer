"use strict";

/* Skapar ett statiskt objekt */
var Memory = { 
    //Skapar en egenskap som håller koll på antalet vända brickor
    numberTries: 0,
    
    //Skapar en egenskap som refererar till den utslumpade arrayen
    randomArray: [],
    
    //Skapar en egenskap som håller koll på id för senast uppvända brickan
    idTurnedCard: 0,
    
    init: function() {
        
        var rows = 3;
        var cols = 4;

        this.randomArray = RandomGenerator.getPictureArray(rows,cols);
        
        var colsCount = 1;
        
        //Skriver ut en tabell om arrayens längd är större än 1
        if (this.randomArray.length > 0) {
            //Hämtar en referens till div-taggen där tabellen ska vara
            var tableDiv = document.getElementById("tableDiv");
            var tableHTML = "<table>";
            for (var i=0; i<this.randomArray.length; i++) {
                //Lägger till en tr-tagg om colsCount % cols = 0
                if (colsCount % cols === 1) {
                    tableHTML += "<tr>"; 
                }
                //Lägger till en td-tagg och numret
                var arrayId = randomArray[i];
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
        
            imgId = "card"+imgId;
            //Hämta referens till länken
            var image = document.getElementById(imgId);
            var imgSrc = "pics/"+arrayId+".png";
            
            image.setAttribute("src",imgSrc);
            
            Memory.numberTries = Memory.numberTries + 1;
            
            //Kollar om den senast uppvända brickan är densamma som föregående
            if (Memory.idTurnedCard !== arrayId) {
            
                //Skapar en timer som vänder tillbaka brickan om en sekund
                setTimeout(function() {
                    var imgSrc = "pics/0.png";
                    image.setAttribute("src",imgSrc);
                    //Kollar om antalet vända brickor är högre än 0, i så fall ta bort ett
                    
                    if (Memory.numberTries > 0) {
                        Memory.numberTries = Memory.numberTries - 1;
                    }
                    
                }, 1000);
            }
            else {
                //Om två likadana brickor är uppe, sätt numberTries till 0
                Memory.numberTries = 0;
                
            }

        }
        else {
            alert("Vänta tills båda brickorna vänts tillbaka.")
        }
        
        //Sätter id för senast vända brickan
        Memory.idTurnedCard = arrayId;
    }
    
}

window.onload = Memory.init;