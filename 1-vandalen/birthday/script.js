"use strict";

window.onload = function(){

	
	var birthday = function(date){

		var valid = false;
		var message;
		
		if (date.length == 10 && (date.charAt(4) === "-") && (date.charAt(7) === "-") ) {
			try {
				//Omvandlar datumet som användaren skrivit in till strängformat
				var dateString = Date.parse(date);
				
				//Variabel för antal millisekunder till nästa födelsedag
				var msLeft;
				
				//Variabel för antal dagar kvar till nästa födelsedag
				var daysLeft;
				
				//Räknar ut antal millisekunder per dag
				var msPerDay = 24 * 60 * 60 * 1000;
				
				//Hämtar dagens datum
				var todayDate = new Date();
				var todayYear = todayDate.getFullYear();
				var todayMonth = todayDate.getMonth();
				var todayDay = todayDate.getDate();
				var todayHours = todayDate.getHours();
				var todayMinutes = todayDate.getMinutes();
				var todaySeconds = todayDate.getSeconds();
				var todayMilliSeconds = todayDate.getMilliseconds();
				
				//Skapar ett datumobjekt från användarens nästa födelsedag
				var birthdayDate = new Date(date);

				//Adderar 1 till birthdayMonth då månaderna börjar på 0
				var birthdayMonth = birthdayDate.getMonth() + 1;
				var birthdayDay = birthdayDate.getDate();
				
				//Lägger in nuvarande år i datumobjektet för nästa födelsedag
				birthdayDate.setYear(todayYear);
				//Lägger födelsedagstiden till nuvarande tid
				birthdayDate.setHours(todayHours);
				birthdayDate.setMinutes(todayMinutes);
				birthdayDate.setSeconds(todaySeconds);
				birthdayDate.setSeconds(todayMilliSeconds);
				
				//alert(birthdayDate);
				//alert(todayDate);
				
				var birthdayYear = birthdayDate.getFullYear();
				
				//Kollar om födelsedagen redan ägt rum eller ligger längre fram i år
				if (birthdayDate > todayDate) {
					//Födelsedagen ligger längre fram i år
					
					//Kollar om födelsedagen är imorgon
					//Räknar ut intervallet för dagen innan födelsedagen
					var dayBeforeBirthday = new Date();
					dayBeforeBirthday = birthdayDate - msPerDay;
					
					
					//Räknar ut antalet millisekunder tills användaren fyller år
					//med antagandet (enl uppgiften att användaren fyller år i år)
					msLeft = birthdayDate - todayDate;
					
					//Omvandlar millisekunder till dagar
					daysLeft = Math.round(msLeft/msPerDay);
					
					message = daysLeft;
					
				}
				if (birthdayDate < todayDate) {
					//Födelsedagen har redan ägt rum

					//Skapar ett datumobjekt för nästa års födelsedag
					var nextYearBirthday = new Date();
					nextYearBirthday.setYear(todayYear + 1);
					nextYearBirthday.setMonth(birthdayMonth - 1);
					nextYearBirthday.setDate(birthdayDay);
					
					//Räknar ut hur många dagar som är kvar tills nästa års födelsedag
					msLeft = nextYearBirthday - todayDate;
					
					//Omvandlar millisekunder till dagar
					daysLeft = Math.round(msLeft/msPerDay);
					
					message = daysLeft;
					
				}
				
				
				if (birthdayDate === todayDate) {
					message = 0;
				}
				
				
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