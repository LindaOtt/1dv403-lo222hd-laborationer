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
    
    question: "Empty",
    
    nextURL: "",
    
    init: function() {
    
        //Hämtar frågan
        var url = "http://vhost3.lnu.se:20080/question/1";
        TheQuiz.getInfo(url, TheQuiz.saveResponse);
        
         //Hämtar värdet från response
        //alert("Length: " + TheQuiz.response.length);
        /*
        TheQuiz.response.forEach(function(item){
            console.log("Id: " + item.id);
            console.log("Question: " + item.question);
        });
        */
        
        var responseLength = TheQuiz.response.length;
        
        //TheQuiz.writeQuestion();
        
        TheQuiz.response.forEach(function(item){
            var questionGet = item.question;
            alert("questionGet: " + questionGet);
            var questionText = document.getElementById("question");
            questionText.innerHTML = questionGet;
        });
        
       
        console.log("Init: TheQuiz.response[0]: " + TheQuiz.response);
    
        var nextURL;
        
        
        //Skriver ut formuläret
        //if (TheQuiz.writeForm()) {
            TheQuiz.writeForm();
            var submitButton = document.getElementById("submitbutton");
            submitButton.addEventListener("click", function(){
                //Skicka iväg informationen till servern
                TheQuiz.sendResponse();
            });
        //}
        //else {
            //alert("Det gick inte att skriva ut formuläret.");
        //}
        
        
    
    },
    
    saveResponse: function(data) {
            TheQuiz.response.length = 0;
            TheQuiz.response.push(data);
    },
    
    writeQuestion: function() {
        alert("TheQuiz length: " + TheQuiz.response.length);
        TheQuiz.response.forEach(function(item){
            var questionGet = item.question;
            alert("questionGet: " + questionGet);
            var questionText = document.getElementById("question");
            questionText.innerHTML = questionGet;
        });
    },

    
    //Funktion som hämtar info
    //url är dit requestobjektet ska skickas,
    //infotyp är den typ av info som efterfrågas
    getInfo: function(url, callback) {

    
        var xhr = new XMLHttpRequest(); //skapat requestobjekt
        
        var response;
        
		xhr.onreadystatechange = function(){

			if(xhr.readyState === 4 && xhr.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
				var responseObject = JSON.parse(xhr.responseText);
				callback(responseObject);
				
				//Sparar response i egenskap på objektet
                TheQuiz.saveResponse(responseObject);
				
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
    
    sendResponse: function() {

        
        //var nextURL =  "http://vhost3.lnu.se:20080/answer/1/";
        
        TheQuiz.response.forEach(function(item){
            var response = item.response;
            var nextURL = item.nextURL;
        });
       
        document.getElementById("submitbutton").addEventListener("click", function(){
            //Hämtar värdet från input-fältet i formuläret
            //var answer = document.getElementById("answer");

            
            var answer = {
                "answer": 2
            };
            
            

            //Omvandla användarens svar till JSON-format
            answer = JSON.stringify(answer);
            
            console.log("answer: " + answer);
            
            
            //Skicka användarens svar i JSON-format till servern
            var xhr2 = new XMLHttpRequest(); //skapat requestobjekt
    
    		xhr2.onreadystatechange = function(){
    
    			if(xhr2.readyState === 4 && xhr2.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
    				console.log("xhr2.responseText: " + xhr2.responseText);
    			}
    			else {
    			    console.log("xhr2.readyState: " + xhr2.readyState);
    			}
    
    		};
    		
    		console.log("nextURL 2: " + nextURL);
    		
    		xhr2.open('POST', nextURL, true); 
    
    		xhr2.setRequestHeader('Content-Type', 'application/json'); //Talar om för webbservern att det är i JSON-formatet vi skickar.
    
    		xhr2.send(answer);
    		
        });

    },
    
    
    /*
    function writeResponse(response) {
        console.log("Id: " + response.id);
        console.log("Question: " + response.question);
        console.log("nextURL: " + response.nextURL);
        
        var nextURL = response.nextURL;
        
        /* Skriver ut frågan 
		var question = response.question;
		var questionText = document.getElementById("question");
        questionText.innerHTML = question;
        
        document.getElementById("submitButton").addEventListener("click", function(){
            //Hämtar värdet från input-fältet i formuläret
            var answer = document.getElementById("answer").value;

            //Omvandla användarens svar till JSON-format
            answer = JSON.stringify(answer);
            console.log("answer: " + answer);
            
            
            //Skicka användarens svar i JSON-format till servern
            var xhr2 = new XMLHttpRequest(); //skapat requestobjekt
    
    		xhr2.onreadystatechange = function(){
    
    			if(xhr2.readyState === 4 && xhr2.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
    				console.log("xhr2.responseText: " + xhr2.responseText);
    			}
    			else {
    			    console.log("xhr2.readyState: " + xhr2.readyState);
    			}
    
    		};
    		
    		console.log("nextURL 2: " + nextURL);
    		
    		xhr2.open('POST', nextURL, true); 
    
    		xhr2.setRequestHeader('Content-Type', 'application/json'); //Talar om för webbservern att det är i JSON-formatet vi skickar.
    
    		xhr2.send(answer);
    		
        });

    }
    
    */
    
    /*
    document.getElementById("submitButton").addEventListener("click", function(){
        
        
        
        var xhr2 = new XMLHttpRequest(); //skapat requestobjekt
	    
	    xhr2.onreadystatechange = function(){
                alert("Ready");
    			if(xhr2.readyState === 4 && xhr2.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
    				var response = JSON.parse(xhr2.responseText);
    				var nextURL = response.nextURL;
    				alert(nextURL);
    				console.log("nextURL: " + nextURL);
    			}
    			else {
    			    alert("xhr2.readyState: " + xhr2.readyState);
    			    alert("xhr2.status: " + xhr2.status);
    			}

    	};
    	
    	
    
    	xhr2.open("GET", url, true);
    	
    
    	xhr2.send(null);

    }); // Hämtat ut knappen och kopplat en event-hanterare på samma rad.
    */
    
    /*
    document.getElementById("submitButton").addEventListener("click", function(){
    	    
    	    //Hämtar användarens svar från formuläret
    	    var answer = document.getElementById("answer");
    	    
    	    //Omvandlar svaret till JSON-format
    	    var answerJSON = JSON.stringify(answer);
    	    
    		
    		var xhr2 = new XMLHttpRequest(); //skapat requestobjekt
    
    		xhr2.onreadystatechange = function(){
    
    			//console.log("svar");
    
    			if(xhr2.readyState === 4 && xhr2.status === 200) { //Allt ok med anropet och vi fick tillbaka statuskod 200
    				console.log(xhr.responseText);
    				var nextURL = JSON.parse(xhr2.responseText);
    				alert("nextURL: " + nextURL);
    				//questionText.appendChild(question);
    			}
    
    		};
    		
    		//console.log("nextURL: " + submitButton.nextURL);
    		
    		xhr2.open('POST', nextURL, true); //POST skickar data till filen setProduct.php, gör det synkront = true
    
    		xhr2.setRequestHeader('Content-Type', 'application/json'); //Talar om för webbservern att det är i JSON-formatet vi skickar.
    
    		//xhr.send(answerJSON);
    
    }); // Hämtat ut knappen och kopplat en event-hanterare på samma rad.
    */
    
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

window.onload = TheQuiz.init;