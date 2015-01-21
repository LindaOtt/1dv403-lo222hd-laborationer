"use strict";


var TheQuiz = {
    
    //Variabel som håller info hämtat från servern
    responseObject: {},
    
    //Egenskap som håller koll på totala antalet svar som användaren skickar
    numberTries: 0,
    
    //Array som håller koll på antalet försök per fråga
    numTriesQuestion: [],
    
    //Räknare som håller koll på antalet försök per fråga
    count: 0,
    
    nextURL: "",
    
    init: function(url) {
    
        //Hämtar frågan
        TheQuiz.getQuestion(url);
 
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
                //Lägger till ett till totala antalet svar som användaren skickat
                TheQuiz.numberTries = TheQuiz.numberTries + 1;
                
                TheQuiz.count++;
                
                e.preventDefault();
                var nextURL = response.nextURL;
                console.log("nextURL: " + nextURL);
                
                //Skicka användarens svar i JSON-format till servern
                var xhr2 = new XMLHttpRequest(); //skapat requestobjekt
        
        		xhr2.onreadystatechange = function(){
        		    
        		    var error = document.getElementById("error");
        
        			if(xhr2.readyState === 4) { //Allt ok med anropet och vi fick tillbaka statuskod 200
        			    
        			    if (xhr2.status === 200) {
        			        
            				//Användaren svarade rätt!
            				console.log(xhr2.responseText);
            				
            				//Skriver ut meddelande
                            error.innerHTML = "Rätt svar!";
            				
            				//Hämtar nästa URL
            				var response = JSON.parse(xhr2.responseText);
            				
            				//Ladda om med ny fråga och URL
            				TheQuiz.init(response.nextURL);
            				
            				//Lägger till antalet försök på den här frågan till TheQuiz.numTriesQuestion
            				TheQuiz.numTriesQuestion.push(TheQuiz.count);
            				TheQuiz.count = 0;
            				
            				
        			    }
        			    
        			    else {
        			        
        			        //Användaren svarade fel!
            			    console.log(xhr2.responseText);
            			    
            			    //Skriver ut felmeddelande
                            error.innerHTML = "Fel svar! Försök igen.";
        			    }
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
        		
        		//alert(TheQuiz.numTriesQuestion.length);
        		//alert(TheQuiz.numTriesQuestion.count);
                for (var i=0; i<TheQuiz.numTriesQuestion.length; i++) {
    			    console.log("TheQuiz number tries per question " + i + ": " + TheQuiz.numTriesQuestion[i]);
    			}
            });
            
           
    },

    
    //Funktion som hämtar info
    //url är dit requestobjektet ska skickas,
    //infotyp är den typ av info som efterfrågas
    getQuestion: function(url) {

        var xhr = new XMLHttpRequest(); //skapat requestobjekt
        
		xhr.onreadystatechange = function(){
		    var error = document.getElementById("error");

			if(xhr.readyState === 4) { //Allt ok med anropet och vi fick tillbaka statuskod 200
			    if (xhr.status === 200) {
    				var response = JSON.parse(xhr.responseText);
    				
    				TheQuiz.writeAll(response);
			    }
			    if (xhr.status === 404) {
			        //Frågorna är slut!
			        //Skriver ut meddelande
			        var message = "<p>Du svarade på " + TheQuiz.numTriesQuestion.length + " frågor.<br>";
			        message = message + "Frågorna är slut! Det tog dig " + TheQuiz.numberTries + " försök att svara rätt.</p><p>";
			        for (var i=0; i<TheQuiz.numTriesQuestion.length; i++) {
                        message = message + "Fråga " + (i + 1) + ": " + TheQuiz.numTriesQuestion[i] + " försök.<br>";
			        }
			        message = message + "</p>";
                    error.innerHTML = message;
                    
                    TheQuiz.emptyForm();
        	    }
				
			}
			

		};
    
    	xhr.open("GET", url, true);
    
    	xhr.send(null);
    	
        xhr.delete;
    },
    
    
    
    writeForm: function() {
        var formHTML = "<form>";
        formHTML += "<input type=\"text\" id=\"answer\" name=\"answer\">";
        formHTML += "<input id=\"submitbutton\" type=\"submit\" value=\"Skicka svar\">";
        formHTML += "</form>";
       
        var formDiv =  document.querySelector("#questionform");
        formDiv.innerHTML = formHTML;
        
    },
    
    emptyForm: function() {
        //Tömmer frågan
        var questionText = document.getElementById("question");
        questionText.innerHTML = "";
        
        //Tar bort formuläret
        var formDiv =  document.querySelector("#questionform");
        formDiv.innerHTML = "";
    }
    

};

window.onload = TheQuiz.init("http://vhost3.lnu.se:20080/question/1");