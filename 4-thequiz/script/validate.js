
"use strict";
var Validator = {
    validate: function(namn) {
        console.log("namn: " + namn);
       
        var field = document.getElementById(namn);
        console.log("field: " + field);
        if (field.value === "" || field.value === null) {
            
            var errorText = document.createTextNode("Detta fält får inte lämnas blankt");
            
            var errormessage = document.getElementById("errormessage");
            errormessage.appendChild(errorText);
        }
        else {
            field.style.color = "green";
            document.getElementById("fornamnlabel").style.color = "green";
        }
    },
    
    removeMessage: function(namn) {
        var errormessage = document.getElementById(namn);
        errormessage.removeChild(errormessage.firstChild);
        console.log(errormessage);
    }
}