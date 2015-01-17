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


var TheQuiz = {
    
    //Variabel som håller info hämtat från servern
    response: [],
    
    responseId: 0,
    
    responseObject: {},
    
    question: "Empty",
    
    nextURL: "",
    
    init: function(url) {
    
        //Hämtar frågan
        TheQuiz.getQuestion(url);

        var nextURL;
 
    },
    
    saveResponse: function(data) {
            TheQuiz.response.length = 0;
            TheQuiz.response.push(data);
    },
    
    writeAll: function(response) {
            //Skriver ut frågan
            var questionText = document.getElementById("question");
            questionText.innerHTML = response.question;
            
            //Skriver ut formuläret
            TheQuiz.writeForm();
            
            //Skapa en lyssnare på knappen
            document.getElementById("submitbutton").addEventListener("click", function(e){
                e.preventDefault();
                var nextURL = response.nextURL;
                console.log("nextURL: " + nextURL);
                
                //Skicka användarens svar i JSON-format till servern
                var xhr2 = new XMLHttpRequest(); //skapat requestobjekt
        
        		xhr2.onreadystatechange = function(){
        
        			if(xhr2.readyState === 4 && xhr2.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
        				//Användaren svarade rätt!
        				console.log(xhr2.responseText);
        				
        				//Ladda om med ny fråga och url
        			}
        			else {
        			    //Användaren svarade fel!
        			    console.log(xhr2.responseText);
        			}
        
        		};
        		
        		
        		
        		xhr2.open('POST', nextURL, true); 
        
        		xhr2.setRequestHeader('Content-Type', 'application/json'); //Talar om för webbservern att det är i JSON-formatet vi skickar.
        		
        		//Hämtar innehållet i formuläret
        		var answer = document.getElementById("answer");
        		var value = answer.value;
        		
        		//Skapar ett objekt av värdena
        		TheQuiz.responseObject.answer = value;
                        		
        		//Omvandlar svaret till JSON-format
        		answer = JSON.stringify(TheQuiz.responseObject);
        		console.log("answer: " + answer);
        		
        		//Skickar svaret
        		xhr2.send(answer);
            });
    },

    
    //Funktion som hämtar info
    //url är dit requestobjektet ska skickas,
    //infotyp är den typ av info som efterfrågas
    getQuestion: function(url) {

    
        var xhr = new XMLHttpRequest(); //skapat requestobjekt
        
        var response;
        
		xhr.onreadystatechange = function(){

			if(xhr.readyState === 4 && xhr.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
				var response = JSON.parse(xhr.responseText);
				
				TheQuiz.writeAll(response);
				
				//Sparar response i egenskap på objektet
                //TheQuiz.saveResponse(responseObject);
				
			}

            //alert("Response object:" + response);

		};
    
    	xhr.open("GET", url, true);
    
    	xhr.send(null);
    	
        xhr.delete;
    },
    
    
    
    writeForm: function() {
        var form = document.createElement("form");
        form.id="questionform";
        var labelAnswer = document.createElement("label");
        labelAnswer.id = "labelanswer";
        var inputAnswer = document.createElement("input");
        inputAnswer.id = "answer";
        inputAnswer.type = "text";
        inputAnswer.name = "answer";
        var submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.id = "submitbutton";
        submitButton.value = "Skicka svar";
        
        form.appendChild(labelAnswer);
        form.appendChild(inputAnswer);
        form.appendChild(submitButton);
        
        var formDiv =  document.querySelector("#questionform");
        formDiv.appendChild(form);
        
    },
    
   
    
    submitData: function(nextURL) {
        //Hämtar användarens svar från formuläret
	    var answer = document.getElementById("answer");
	    
	    //Omvandlar svaret till JSON-format
	    var answerJSON = JSON.stringify(answer);
	    
		
		var xhr = new XMLHttpRequest(); //skapat requestobjekt

		xhr.onreadystatechange = function(){

			//console.log("svar");

			if(xhr.readyState === 4 && xhr.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
				console.log(xhr.responseText);
				var nextURL = JSON.parse(xhr.responseText);
				alert("nextURL: " + nextURL);
				//questionText.appendChild(question);
			}

		};
		
		//console.log("nextURL: " + submitButton.nextURL);
		
		xhr.open('POST', nextURL, true); //POST skickar data till filen setProduct.php, gör det synkront = true

		xhr.setRequestHeader('Content-Type', 'application/json'); //Talar om för webbservern att det är i JSON-formatet vi skickar.

		xhr.send(answerJSON);
    }
    

};

window.onload = TheQuiz.init("http://vhost3.lnu.se:20080/question/1");