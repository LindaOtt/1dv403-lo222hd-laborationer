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
            var galleryWindow = document.createElement("div");
            galleryWindow.id="gallery";
            var galleryIcon = document.createElement("img");
            
            var galleryTitleDiv = document.createElement("div");
            galleryTitleDiv.id = "gallerytitle";
            galleryWindow.appendChild(galleryTitleDiv);
            var galleryTitle = document.createTextNode("Image Viewer");
            galleryIcon.setAttribute("src","pics/icon.png");
            galleryIcon.id = "galleryicon";
            desktopDiv.appendChild(galleryWindow);
            
            
            
            var galleryCloseBtn = document.createElement("img");
            galleryCloseBtn.setAttribute("src","pics/close.png");
            galleryCloseBtn.id = "galleryclose";
            
            galleryTitleDiv.appendChild(galleryIcon);
            galleryTitleDiv.appendChild(galleryTitle);
            galleryTitleDiv.appendChild(galleryCloseBtn);
            
            var galleryContentDiv = document.createElement("div");
            galleryContentDiv.id = "gallerycontent";
            galleryWindow.appendChild(galleryContentDiv);
            
            var galleryContentH1 = document.createElement("H1");
            galleryContentDiv.appendChild(galleryContentH1);
            
            var galleryContentH1Text = document.createTextNode("Gallery");
            galleryContentH1.appendChild(galleryContentH1Text);
            
            //När fönstret är färdigladdat, hämta bilderna
            //Kollar att #gallerycontent har skapats
            var timerId = window.setTimeout(function() {
                var galleryContentDiv = document.getElementById("gallery");
                if (galleryContentDiv === null || galleryContentDiv === undefined) {
                    //Gör inget och låt loopen fortsätta
                    console.log("Inside timerId");
                }
                else {
                    console.log("Found");
                    Desktop.getImages();
                    clearTimeout(timerId);
                }
            }, 1000);
    
        });
        
        //console.log("galleryCloseBtn: " + galleryCloseBtn);
        
        /*
        var galleryCloseBtn = document.querySelector("#galleryclose");
        galleryCloseBtn.addEventListener("click", function(){
            alert("Click!");
            var galleryNode = document.querySelector("gallery");
            galleryNode.parentNode.removeChild(galleryNode);
        });
        */
        
        
        
        

        
        
        
    },
    
    getImages: function() {
    
        var xhr = new XMLHttpRequest(); //skapat requestobjekt
        
        var response;
        
		xhr.onreadystatechange = function(){

			if(xhr.readyState === 4 && xhr.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
				response = JSON.parse(xhr.responseText);
				//Skriver ut bilderna i galleriet
				Desktop.writeImages(response);
				
				
			}
			else {
			    //alert("Not working");
			}

		};

    	xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    
    	xhr.send(null);
    	
        xhr.delete;
        
    },
    
    writeImages: function(response) {
        var galleryContentDiv = document.getElementById("gallerycontent");
        var i;
        for (i = 0; i < response.length; i++) {
            var img = document.createElement("img");
            img.setAttribute("src",response[i].URL);
            galleryContentDiv.appendChild(img);
        }
    }
    
};

window.onload = Desktop.init;