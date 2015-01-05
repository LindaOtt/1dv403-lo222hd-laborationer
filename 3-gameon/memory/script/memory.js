"use strict";

/* Skapar ett statiskt objekt */
var Memory = { 
    //Skapar en egenskap som refererar till den utslumpade arrayen
    randomArray: [],
    
    init: function() {

        this.randomArray = RandomGenerator.getPictureArray(4,4);
        
        alert(this.randomArray.length);
        //Skriver ut arrayen
        for (var i=0; i<this.randomArray.length; i++) {
            console.log(this.randomArray[i]);
        }
    }
    
    
}

window.onload = Memory.init;