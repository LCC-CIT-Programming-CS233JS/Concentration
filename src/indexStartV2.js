// Create a class called Concentration.
class Concentration {
    /*
        Add a constructor.  In the body of the constructor
        -   Create instance variables to replace the global variables
        -   Bind the class to each of the following methods
        -       this.showMatches = this.showMatches.bind(this);
        -       this.enableAllRemainingCards = this.enableAllCards.bind(this);
        -       this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        -       this.checkCards = this.checkCards.bind(this);
        -       this.disableAllCards = this.disableAllCards.bind(this);
        -       this.isMatch = this.isMatch.bind(this);     
        -   All of the functionality of init will happen in the constructor ... call init.
    */
    constructor() {
        this.imagePath = 'Cards/';
        this.images = Array(20).fill(null);
        this.firstPick = -1;
        this.secondPick = -1;
        this.matches = 0;
        this.tries = 0;

        this.showMatches = this.showMatches.bind(this);
        this.enableAllRemainingCards = this.enableAllCards.bind(this);
        this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        this.checkCards = this.checkCards.bind(this);
        this.disableAllCards = this.disableAllCards.bind(this);
        this.isMatch = this.isMatch.bind(this);

        this.init();
    }

    init() {
        this.fillImages();
        this.shuffleImages();
        this.showMatches();
        this.enableAllCards();
        this.showAllBacks();
    }

    fillImages() {
        let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        let suits = ['h', 's'];
        let index = 0;

        for (let value = 0; value < values.length; value++) {
            for (let suit = 0; suit < suits.length; suit++) {  //still finds interesting the accepted data type change??
                this.images[index] = "card" + values[value] + suits[suit] + ".jpg"; //.jpg as string? works as file extension..car folder??
                index++;
            }
        }
    }

    shuffleImages() {
        for (let i = 0; i < this.images.length; i++) {
            let rnd = Math.floor(Math.random() * this.images.length);
            //let temp = this.images[i];
            //this.images[i] = this.images[rnd];
            //this.images[rnd] = temp;

            //**using destructuring**//
            [this.images[i], this.images[rnd]] = [this.images[rnd], this.images[i]];
        }
    }

    showMatches() {
        let stats = "Matches: " + this.matches + " " + " Attempts: " + this.tries;
        document.getElementById("status").innerHTML = (stats);
    }

    showBack(index) {
        let backImage = this.imagePath + 'black_back.jpg';
        let card = document.getElementById(index);
        card.style.backgroundImage = 'url( ' + backImage + ')';
    }

    showAllBacks() {
        //let cards = document.getElementsByName("card");
        for (let i = 0; i < this.images.length; i++) {
            this.showBack(i);
        }
    }

    enableAllCards() {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++) {
            cards[i].onclick = this.handleClick.bind(this, i);
            cards[i].style.cursor = 'pointer';
        }
    }

    enableAllRemainingCards() {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].style.backgroundImage != 'none') { //might need to remove quotes?
                cards[i].onclick = handleClick(this, i);
                cards[i].style.cursor = 'pointer';
            }
        }
    }

    handleClick(index) {
        let cardImage = this.imagePath + this.images[index];
        document.getElementById(index).style.backgroundImage = 'url( ' + cardImage + ')';
        this.disableCard(index);
        if (this.firstPick == -1) {
            this.firstPick = index;
        }
        else {
            this.secondPick = index;
            this.disableAllCards();
            setTimeout(this.checkCards, 2000);
        }
    }

    disableCard(index) {
        let card = document.getElementById(index);
        card.onclick = () => { };
        card.style.cursor = 'none';
    }

    disableAllCards() {
        let card = document.getElementsByName("card");
        for (let i = 0; i < this.images.length; i++) {
            card[i].onclick = () => { };
            card[i].style.cursor = 'none';
        }
    }

    checkCards() {
        this.tries++;

        if (this.isMatch() == true) {
            this.matches++;
            this.removeCard(this.firstPick);
            this.removeCard(this.secondPick);
            if (this.matches < 10) {
                this.enableAllRemainingCards();
            }
        }

        else {
            this.showBack(this.firstPick);
            this.showBack(this.secondPick);
            this.enableAllRemainingCards();
        }
        this.showMatches();
        this.firstPick = -1;
        this.secondPick = -1;
    }

    isMatch() {
        if (this.images[this.firstPick].substr(4, 1) == this.images[this.secondPick].substr(4, 1)) {
            return true;
        }
        else {
            return false;
        }
    }

    removeCard(index) {
        let card = document.getElementById(index);
        card.style.backgroundImage = 'none';
    }

    /*
        Convert each function to a method.  
        -   Move it inside the class.
        -   Remove the keyword function
        -   Add this. in front of every variable and method
        
        
        THREE OF THE METHODS CHANGE A LITTLE
        -   handleClick will now have a parameter, index
            -   remove the declaration / assignment of the local var index
        -   enableAllCards (and enableAllRemainingCards) have to pass the index to handleClick
            -   the line of code that calls bind must now pass both this and an index
            -   before: cards[i].onclick = this.handleClick.bind(this);
            -   should be: cards[i].onclick = this.handleClick.bind(this, i);
    */
}

// create a variable called concentration
let concentration;
// Add an event handler to the load event of the window. 
// Use an anonymous function or an arrow function to
// set the concentration variable to an instance of Concentration
window.onload = () => { new Concentration(); }




