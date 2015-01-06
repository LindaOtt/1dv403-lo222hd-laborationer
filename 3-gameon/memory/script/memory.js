"use strict";

/* Skapar ett statiskt objekt */
var Memory = { 
    //Skapar en egenskap som refererar till den utslumpade arrayen
    randomArray: [],
    
    init: function() {
        
        var rows = 4;
        var cols = 3;

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
                var imgNumber = this.randomArray[i];
                //tableHTML += "<td><a href=\""+this.randomArray[i]+".png\"><img src=\"pics/0.png\" alt=\"Click me!\"></a></td>";
                tableHTML += "<td><a href=\""+this.randomArray[i]+".png\"><img src=\"pics/"+this.randomArray[i]+".png\" alt=\"Click me!\"></a></td>";
                
                //Lägger till en avslutande tr-tagg om colsCount % cols = 0
                if (colsCount % cols === 0) {
                    tableHTML += "</tr>"; 
                }

                colsCount++;
                
            }
            //Skriver ut tabellen
            tableDiv.innerHTML = tableHTML;
        }
    }
    
    
}

window.onload = Memory.init;