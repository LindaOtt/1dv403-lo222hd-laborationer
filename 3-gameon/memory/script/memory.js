"use strict";

/* Skapar ett statiskt objekt */
var Memory = { 
    //Skapar en egenskap som refererar till den utslumpade arrayen
    randomArray: [],
    
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
        
        imgId = "card"+imgId;
        //Hämta referens till länken
        var image = document.getElementById(imgId);
        alert(arrayId);
        var imgSrc = "pics/"+arrayId+".png";
        
        image.setAttribute("src",imgSrc);
    }
    
}

window.onload = Memory.init;