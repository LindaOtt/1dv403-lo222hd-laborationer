
"use strict";
var Validator = {
    
    
    
    validate: function(namn) {
        console.log("namn: " + namn);
       
        var field = document.getElementById(namn);

        if (field.value === "" || field.value === null) {
            Validator.toggleError(namn);
            console.log("validate 1");
        }
        else {
            var label = namn + "label";
            label = document.getElementById(label);
            field.className, label.className = "messagegreen";
            
            //Tar bort felmeddelandet
            Validator.toggleError(namn);
        }
    },
    
    toggleError: function(namn) {
        var node = "error" + namn;
        
        console.log("node: " + node);

        var errorMessage = document.getElementById(node);
        
        console.log("errorMessage: " + errorMessage);
        
        console.log("errorMessage value: " + errorMessage.value);
        
        //Kollar om errornoden är tom
        if (errorMessage.value === "" || errorMessage.value === undefined) {
            var errorText = document.createTextNode("Detta fält får inte lämnas blankt");
            console.log("node: " + node);
            
            errorMessage.appendChild(errorText);
            
            var label = namn + "label";
            label = document.getElementById(label);
            label.className = "messagered";
        }
        //Om det finns ett felmeddelade, ta bort det
        else {
            if (errorMessage.firstChild !== null) {
                errorMessage.removeChild(errorMessage.firstChild);
            }
            console.log("There is an error message");
        }
        
        
    },
    

    
    postnummer: function(nummer) {
        
    }
}