var messageApp = {
    
    messages: [],
    
    click: function() {
    	
    	var messageArea = document.getElementById("message-area");
		//Instansierar nytt Message-objekt
		var mess = new Message(messageArea.value, new Date());

		//Lägger till meddelandet till arrayen messages
		messageApp.messages.push(mess);
		
		//Uppdaterar HTML med antal meddelanden
		var numberMessages = messageApp.messages.length;

		var numberMessagesHTML = document.getElementById("number-messages");
		
		numberMessagesHTML.innerHTML = numberMessages;
		
		messageApp.renderMessages();
    	
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
		
		var text = document.createElement("p");
		text.innerHTML = messageApp.messages[messageID].getDate() + ": " + messageApp.messages[messageID].getText();
		var messageWriteOut = document.getElementById("writeout");
		messageWriteOut.appendChild(text);

		
		return false;
	}


}

// Starta applikationen när fönstret laddat klart
//window.onload = messageApp.init;  