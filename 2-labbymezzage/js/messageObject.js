var messageApp = {
    
    messages: [],

	init: function(){
		var messageFromForm = document.getElementById("message-area");
		//Instansierar nytt Message-objekt
		var mess = new Message(messageFromForm.value, new Date());

		//Lägger till meddelandet till arrayen messages
		messageApp.messages.push(mess);
		   
		var writeMessage = messageApp.messages[0].getText() + " (" + messageApp.messages[0].getDate() + " )";
		   
		alert(writeMessage);
		//alert(writeMessage2);
	}
	
}

// Starta applikationen när fönstret laddat klart
//window.onload = messageApp.init;  