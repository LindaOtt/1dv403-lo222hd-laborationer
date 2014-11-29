var messageApp = {

	init: function(){
	    //Instansierar nytt Message-objekt
	    var mess = new Message("Testmeddelande", new Date());
	    //alert(mess); //Skriver ut meddelandet mha toString
	    alert(mess.getText()); //Skriver ut endast texten
	    mess.setText("En annan text"); //Skickar in en ny messagesträng
	    alert(mess.getText()); //Testar message med nya texten
	}
	
}

// Starta applikationen när fönstret laddat klart
window.onload = messageApp.init;  