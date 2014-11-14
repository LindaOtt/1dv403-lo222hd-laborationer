"use strict";

window.onload = function(){

	
	var birthday = function(date){

		var valid = false;
		var message = 0;
		
		//Kollar formatet på det inmatade datumet
		/*
		if (date.length == 10 && (date.charAt(4) === "-") && (date.charAt(7) === "-") ) {
			if (isNaN(Date.parse(date))) {
				alert("Not valid!");
			}
			else {
				alert("Valid!");
			}
		}
		else {
			alert('Not valid!');
		}
		*/
		
		if (date.length == 10 && (date.charAt(4) === "-") && (date.charAt(7) === "-") ) {
			try {
				//Omvandlar datumet som användaren skrivit in till strängformat
				var dateString = Date.parse(date);
				
				//Hämtar dagens datum
				var todayDate = new Date();
				var todayYear = todayDate.getFullYear();
				var todayMonth = todayDate.getMonth();
				var todayDay = todayDate.getDate();
				
				//Skapar ett datumobjekt från användarens nästa födelsedag
				var birthdayDate = new Date(date);

				//Adderar 1 till birthdayMonth då månaderna börjar på 0
				var birthdayMonth = birthdayDate.getMonth() + 1;
				var birthdayDay = birthdayDate.getDate();
				
				//Lägger in nuvarande år i datumobjektet för nästa födelsedag
				birthdayDate.setYear(todayYear);
				var birthdayYear = birthdayDate.getFullYear();
				
				alert(birthdayYear + "-" + birthdayMonth + "-" + birthdayDay);
				
				//Räknar ut antalet dagar tills användaren fyller år
				//med antagandet (enl uppgiften att användaren fyller år i år)
				var timeLeft = birthdayDate - todayDate;
				
				message = timeLeft;
				
				//var nextBirthday = todayYear + "-" + birthdayMonth + "-" + birthdayDay;
				//var nextBirthdayObject = new Date(nextBirthday);

			}
			catch(error) {
				message = error;
			}
		}

		return message;

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};