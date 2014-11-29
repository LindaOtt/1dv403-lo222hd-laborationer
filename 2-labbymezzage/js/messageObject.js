var messageApp = {
    
    messages: [],

	init: function(){
		//Instansierar nytt Message-objekt
		var mess0 = new Message("Testmeddelande 1", new Date());
		var mess1 = new Message("Testmeddelande 2", new Date());

		//Lägger till meddelandet till arrayen messages
		messageApp.messages.push(mess0);
		messageApp.messages.push(mess1);
		   
		var writeMessage = messageApp.messages[0].getText();
		var writeMessage2 = messageApp.messages[1].getText();
		   
		//alert(writeMessage);
		//alert(writeMessage2);
	}
	
}

// Starta applikationen när fönstret laddat klart
window.onload = messageApp.init;  