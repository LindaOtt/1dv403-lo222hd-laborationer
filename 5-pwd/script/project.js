"use strict";

/* Skapar ett statiskt objekt */
var Desktop = { 

    init: function() {
        //Sätt rätt storlek på webbläsarfönstret
        window.resizeTo(1024,640);
        
        //Skapar element till skrivbordet
        var desktopDiv = document.querySelector("#desktop");
        
        var menuDiv = document.createElement("div");
        menuDiv.id = "menu";
        desktopDiv.appendChild(menuDiv);
        
        var menuImg = document.createElement("img");
        menuImg.setAttribute("src","pics/icon.png");
        menuDiv.appendChild(menuImg);
        
        menuImg.addEventListener("click", function(){
            alert("Click");
        });
        
    }
    
};

window.onload = Desktop.init;