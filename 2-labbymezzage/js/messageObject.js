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
		text.innerHTML = messageApp.messages[messageID].getDate() + ": " + messageApp.messages[messageID].getText() + " ";
		
		//Skapar en länk för att ta bort meddelandet
		var text2 = document.createElement("a");
		text2.setAttribute('href', "#");
		var onClickAttr = "messageApp.removeMessage(" + messageID + ")";
		text2.setAttribute('onclick', onClickAttr);
		var imgRemove = document.createElement("img");
		imgRemove.setAttribute('src','bilder/ta-bort.jpg');
		text2.appendChild(imgRemove);
		text.appendChild(text2); 
		
		var messageWriteOut = document.getElementById("writeout");
		messageWriteOut.appendChild(text);

		
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
	}


}

// Starta applikationen när fönstret laddat klart
//window.onload = messageApp.init;  