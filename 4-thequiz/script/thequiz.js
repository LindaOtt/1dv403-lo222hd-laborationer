"use strict";

/*
Applikationen ska vara en SPA - Single Page Application

Användaren ska svara på ett antal frågor. Svarar anv rätt
tas hon vidare till nästa fråga.
Svarar anv fel får hon reda på det och möjlighet att svara igen.

Frågorna som ska besvaras finns på en extern server och nås via 
ett REST-api. Adress: http://vhost3.lnu.se:20080
Sökväg till första frågan: /question/1

Applikationen ska hålla reda på hur många felaktiga svar 
man givit för varje fråga.

När samtliga frågor besvarats ska resultatet presenteras där
det framgår hur många försök man behövde för att klara varje fråga.

Vilka http-metoder behöver du använda för att kontakta API:et? 
Hur ska svaren på frågorna skickas tillbaka? 
Finns det någon dokumentation tillgänglig för API:et?

Hur får jag tag i frågan som användaren ska svara på?
Hur skickar jag tillbaka svaret på frågan till API:et?
I vilket format ska frågan skickas tillbaka?


*/


window.onload = function(){
    alert("Hello");
    var questionText = document.getElementById("question");
    
    console.log("test");
    
    var xhr = new XMLHttpRequest(); //skapat requestobjekt

		xhr.onreadystatechange = function(){

			console.log("svar");

			if(xhr.readyState === 4 && xhr.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
				console.log(xhr.responseText);
				var question = JSON.parse(xhr.responseText);
				console.log(question.first);
				questionText.appendChild(question);
			}

		};

		xhr.open("GET", "https://vhost3.lnu.se:20080/question/1", true);

		xhr.send(null);

/*
	document.getElementById("submitButton").addEventListener("click", function(){
		
		var xhr = new XMLHttpRequest(); //skapat requestobjekt

		xhr.onreadystatechange = function(){

			//console.log("svar");

			if(xhr.readyState === 4 && xhr.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
				console.log(xhr.responseText);
				var question = JSON.parse(xhr.responseText);
				console.log(question.first);
				questionText.appendChild(question);
			}

		};

		xhr.open("GET", "http://vhost3.lnu.se:20080/question/1/", true);

		xhr.send(null);

	}); // Hämtat ut knappen och kopplat en event-hanterare på samma rad.
*/
};