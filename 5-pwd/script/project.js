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
            
            var galleryTitleH1 = document.createElement("H1");
            galleryTitleH1.id = "gallerytitleh1"
            var galleryTitleText = document.createTextNode("Image Viewer");
            galleryTitleH1.appendChild(galleryTitleText);
            galleryIcon.setAttribute("src","pics/icon.png");
            galleryIcon.id = "galleryicon";
            desktopDiv.appendChild(galleryWindow);
            
            
            
            var galleryCloseBtn = document.createElement("img");
            galleryCloseBtn.setAttribute("src","pics/close.png");
            galleryCloseBtn.id = "galleryclose";
            
            galleryTitleDiv.appendChild(galleryIcon);
            galleryTitleDiv.appendChild(galleryTitleH1);
            galleryTitleDiv.appendChild(galleryCloseBtn);
            
            var galleryContentDiv = document.createElement("div");
            galleryContentDiv.id = "gallerycontent";
            galleryWindow.appendChild(galleryContentDiv);
            
            var galleryContentH2 = document.createElement("H2");
            galleryContentDiv.appendChild(galleryContentH2);
            
            var galleryContentH2Text = document.createTextNode("Gallery");
            galleryContentH2.appendChild(galleryContentH2Text);
            
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
    
        }, false);
        
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
        
        var loadingAnim = document.createElement("img");
	    loadingAnim.setAttribute("src","pics/ajax-loader.gif");
	    loadingAnim.id = "loadinganim";
	    
	    loadingAnim.className = "hide";
        
		xhr.onreadystatechange = function(){
		    
		    loadingAnim.className = "";
		    
		    var gallery = document.querySelector("#gallery");
		    gallery.appendChild(loadingAnim);

			if(xhr.readyState === 4 && xhr.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
				response = JSON.parse(xhr.responseText);
				//Skriver ut bilderna i galleriet
				Desktop.writeImages(response);
				console.log("loadingAnim classname: " + loadingAnim.className);
				loadingAnim.className = "hide";
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
        var imgWidth = 0;
        var imgHeight = 0;
        
        for (i = 0; i < response.length; i++) {
            var imgBox = document.createElement("div");
            imgBox.className = "imgbox";
            galleryContentDiv.appendChild(imgBox);
            
            var img = document.createElement("img");
            img.id = "img-" + i;
            img.setAttribute("src",response[i].thumbURL);
            imgBox.appendChild(img);
            
            //Lagra bredden på den bredaste bilden
            if (response[i].thumbWidth > imgWidth) {
                imgWidth = response[i].thumbWidth;
            }
            
            //Lagrar höjden på den högsta bilden
            if (response[i].thumbHeight > imgHeight) {
                imgHeight = response[i].thumbHeight;
            }
            
            
        }
        
        //Skapar en eventlistener på hela galleriet
        document.getElementById("gallery").addEventListener("click", function(e) {
        	// e.target är det klickade elementet
        	if(e.target && e.target.nodeName == "IMG") {
        		//Kolla om bilden som klickats är stängningsknappen
        		//eller om det är en del av galleriet
        		if (e.target.id === "galleryclose") {
        		    //Stänger fönstret
        		    var gallery = document.querySelector("#gallery");
        		    gallery.parentNode.removeChild(gallery);
        		}
        		else {
        		    //Kollar om det som klickats är en bild i galleriet
        		    if (e.target.id.indexOf("img") != -1) {
        		        //Hämta id-nr ur e.target
        		        var targetId = e.target.id.substring(4);
        		        var url = response[targetId].URL;
        		        Desktop.changeBackground(url);
        		    }
        		}
        	}
        });

        
        //Sätt bredden på bilderna till den bredaste bilden
        //Och höjden på bilderna till den högsta bilden
        if ((imgWidth > 0) && (imgHeight > 0)) {
            imgWidth = imgWidth + "px";
            imgHeight = imgHeight + "px";
            var imgBoxes = document.querySelectorAll(".imgbox");
 
            for (var j = 0; j < imgBoxes.length; j++) {
                imgBoxes[j].style.width = imgWidth;
                imgBoxes[j].style.height = imgHeight;
            }
        }
    },
    
    changeBackground: function(url) {
        //console.log("url: " + url);
        url = "url(" + url + ")" ;
        document.body.style.backgroundImage = url;
    }
    
};

window.onload = Desktop.init;