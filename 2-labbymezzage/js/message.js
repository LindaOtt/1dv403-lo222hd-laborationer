/* Skapar en konstruktorfunktion */
function Message(message, date){
    //Skapar privata getters och setters (privilegierade metoder)
    //för meddelanden
    
    //Hämtar meddelandetexten
    this.getText = function() {
        return message;
    }
    
    //Sätter meddelandetexten
    this.setText = function(_text) {
        message = _text;
    }
    
    //Skapar privata getters och setters (privilegierade metoder)
    //för datum
    
    //Hämtar datum
    this.getDate = function() {
        return date;
    }
    
    //Sätter datum
    this.setDate = function(_date) {
        date = _date;
    }
    
    //Strängrepresentation av objektet
    Message.prototype.toString = function() {
        return this.getText() + " (" + this.getDate()+")";
    }
    
    //Hämtar texten med \n utbytt mot <br>
    Message.prototype.getHTMLText = function() {
        
    }
    
}