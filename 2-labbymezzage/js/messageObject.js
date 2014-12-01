var messageApp = {
    
    messages: [],
    
    click: function() {
    	
    	var messageArea = document.getElementById("message-area");
		//Instansierar nytt Message-objekt
		var mess = new Message(messageArea.value, new Date());

		//Lägger till meddelandet till arrayen messages
		messageApp.messages.push(mess);
		
		messageApp.updateMessCounter();
    	
    },
    
    renderMessages: function(){
    	
    	//Rensar först div
		var div = document.getElementById("writeout");
     	div.innerHTML = "";
    	
    	//Uppdaterar HTML med antal meddelanden
		var numberMessages = messageApp.messages.length;
		//Loopar igenom arrayen och skriver ut samtliga meddelanden
    	//mha renderMessage
    	var i;
    	
		for (i=0; i < numberMessages; i++) {
			messageApp.renderMessage(i);
    	}
    	
    },

	renderMessage: function(messageID) {
		var numberMessages = messageApp.messages.length;
		
		if (messageID === undefined) {
			messageID = numberMessages - 1;
		}
		
		//Skapar en paragraf som innehåller meddelandet
		var text = document.createElement("p");
		text.innerHTML = messageApp.messages[messageID].getMessDate() + ": " + messageApp.messages[messageID].getText() + " ";
		
		//Skapar en bildlänk för att ta bort meddelandet
		var text2 = document.createElement("a");
		text2.setAttribute('href', "#");
		var onClickAttr = "messageApp.removeMessage(" + messageID + ")";
		text2.setAttribute('onclick', onClickAttr);
		var imgRemove = document.createElement("img");
		imgRemove.setAttribute('src','bilder/ta-bort.png');
		text2.appendChild(imgRemove);
		text.appendChild(text2); 
		
		var messageWriteOut = document.getElementById("writeout");
		messageWriteOut.appendChild(text);
		
		//Skapar en bildlänk för att visa aktuell tid
		var timeText = document.createElement("a");
		timeText.setAttribute('href', "#");
		var onClickAttr2 = "messageApp.showTime(" + messageID + ")";
		timeText.setAttribute('onclick',onClickAttr2);
		var imgShowTime = document.createElement("img");
		imgShowTime.setAttribute('src','bilder/visa-tid.png');
		timeText.appendChild(imgShowTime);
		text.appendChild(timeText);
		
		
		return false;
	},
	
	removeMessage: function(messageID) {
		//Tar bort meddelandet ur arrayen messages
		var removed = messageApp.messages.splice(messageID, 1);

		messageApp.renderMessages();
		messageApp.updateMessCounter();
	},
	
	updateMessCounter: function() {
		//Uppdaterar HTML med antal meddelanden
		var numberMessages = messageApp.messages.length;

		var numberMessagesHTML = document.getElementById("number-messages");
		
		numberMessagesHTML.innerHTML = numberMessages;
		
		messageApp.renderMessages();
	},
	
	showTime: function(messageID) {
		var alertDate = messageApp.messages[messageID].getMessDate();
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		var alertMessage = "Inlägget skapades " + alertDate.toLocaleDateString('sv-SV', options) + " klockan " + alertDate.getHours() + ":" + alertDate.getMinutes() + ":" + alertDate.getSeconds();
		//Visar aktuell tid
		alert(alertMessage);
	},
	
	keyPress: function(e) {
		
		//Kollar så att användaren inte håller ner SHIFT
		//och att användaren trycker på Enter
		if ((!e.shiftKey) && e.keyCode == 13) {
			//Användaren har tryckt på enter, skapa messageobjekt och kör renderMessages
			messageApp.click();
			messageApp.renderMessages();
			messageApp.updateMessCounter();
		}

	}


}

// Starta applikationen när fönstret laddat klart
//window.onload = messageApp.init;  