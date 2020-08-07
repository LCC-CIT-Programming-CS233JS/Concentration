// start with these global variables
// the folder where your card images are stored
var imagePath = 'Cards/';
// an array that stores the images for each card
var images = Array(20).fill(null);
// the index of the first card picked by the user
var firstPick = -1;
// the index of the second card picked by the user
var secondPick = -1;
// statistics about this "round"
var matches = 0;
var tries = 0;

// PART 1 //
// when the page loads, call the function init
window.onload = init;  //when calls a function and places in variable no ()?

// this function initializes the page
function init()
{
    // fill the array of images
    // shuffle them
    // show the number of matches on the page
    // enable all of the card elements on the page
    // show the backs of all of the cards
    fillImages();
    shuffleImages();
    showMatches();
    enableAllCards();
    showAllBacks();
    /*
    for (let i = 0; i < images.length; i++) {
        let cardImage = imagePath + images[i];
        let card = document.getElementById(i);
        card.style.backgroundImage = 'url( ' + cardImage + ')';
        */
    }

// shows the number of matches and tries in the status element on the page
function showMatches() {
    let stats = "Matches: " + matches + " " + " Attempts: " + tries;
    document.getElementById("status").innerHTML = (stats);
}

// fills the array images with 10 pairs of card filenames
// card filenames follow this pattern:  cardvs.jpg where
// v is the first char of the value of the card and 
// s is the first char of the suit of the card
// example:  cardjh.jpg is the jack of hearts
function fillImages() {
    let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6','5'];
    let suits = ['h', 's'];
    let index = 0;

    for (let value = 0; value < values.length; value++) {
        for (let suit = 0; suit < suits.length; suit++) {  //still finds interesting the accepted data type change??
            images[index] = "card" + values[value] + suits[suit] + ".jpg"; //.jpg as string? works as file extension..car folder??
            index++;
        }
    }

}

// shuffles the elements in the images array
function shuffleImages() {
    for (let i = 0; i < images.length; i++) {
        let rnd = Math.floor(Math.random() * images.length);
        let temp = images[i];
        images[i] = images[rnd];
        images[rnd] = temp;
    }

}

// assigns the handleclick function to the onclick event for all cards
// on the page.  All cards have the name attribute set to card.
// It also sets the cursor (part of the style) to 'pointer'
function enableAllCards() {
    let cards = document.getElementsByName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = handleClick;
        cards[i].style.cursor = 'pointer';
    }

}

// enables (see enable all) only the cards whose backgroundImage
// style property is not 'none'
function enableAllRemainingCards() {
    let cards = document.getElementsByName("card");
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].style.backgroundImage != 'none'){ //might need to remove quotes?
        cards[i].onclick = handleClick;
        cards[i].style.cursor = 'pointer';
        }
    }
}

// shows the back of one card based on it's index
// each card has an id attribute set to it's index in the html page
// the backgroundImage (style) is set to the url of the image
// for a card back to "show the back"
function showBack(index) {
        let backImage = imagePath + 'black_back.jpg';
        let card = document.getElementById(index);
        card.style.backgroundImage = 'url( ' + backImage + ')';
}

// shows the back for all cards
// calls showBack in the body of a for loop
function showAllBacks() {
    let cards = document.getElementsByName("card");
    for (let i = 0; i < cards.length; i++) {
        showBack(i);
    }
}
// END PART 1 - TEST THIS FAR //

// PART 2 //
// this is the function that fires when the user clicks on a card
function handleClick() {
    // declare the variable index and assign it to the current card's id attribute
    let index = this.id;
    // declare cardImage and assign it to the image for this card
    // set the backgroundImage to the url of the cardImage
    let cardImage = imagePath + images[index];
    this.style.backgroundImage = 'url( ' + cardImage + ')';
    // disable the card 
    disableCard(index);
    // if this is the first card picked
    //      assign firstPick to index
    // else
    //      assign secondPick to index
    //      disable all of the cards
    //      set a timer for 2 seconds.  Call checkCards when it fires.
    // end if
    if (firstPick == -1) {
        firstPick = index;
    }
    else {
        secondPick = index;
        disableAllCards();
        setTimeout(checkCards, 2000);
    }
}

// disable one card based on it's index
function disableCard(index) {
    var card = document.getElementById(index);
    card.onclick = () => {}; 
    card.style.cursor = 'none';
}

// disable all of the cards
function disableAllCards() {
    var card = document.getElementsByName("card");
    for (let i = 0; i < images.length; i++) {
        card[i].onclick = () => {};
        card[i].style.cursor = 'none';
    }
}
// END PART 2 - TEST TO HERE //

// PART 3 //
// checks the 2 cards that have been picked for matches 
function checkCards() {
    // increment the number of tries
    tries++;

    if (isMatch() == true){
        matches++;
        removeCard(firstPick);
        removeCard(secondPick);
        if (matches < 10) {
            enableAllRemainingCards();
        }
    }

    else {
        showBack(firstPick);
        showBack(secondPick);
        enableAllRemainingCards();
    }

    // if the 2 cards match
    //      increment the number of matches
    //      remove the first(pick) card from the board
    //      remove the secon(pick) card from the board
    //      if there are cards on the board
    //          enable all of the remaining cards
    //      end if
    // else
    //      turn the first(pick) card back over
    //      turn the second(pick) card back over
    //      enable all of the remaining cards
    // end if
    // update the matches and tries on the page
    showMatches();
    // reset the firstpick to -1
    // reset the secondpick to -1
    firstPick = -1;
    secondPick = -1;
}

// determines if the images in firstPick and secondPick are a matche
// 2 cards are a match if they have the same value
// cardvs.jpg is the pattern for card file names
function isMatch() {
    if (images[firstPick].substr(4, 1) == images[secondPick].substr(4, 1)) {
        return true;
    }
    else {
        return false;
    }
}

// removes one card from the board based on it's index
// set the backgroundImage to 'none' to remove the card
function removeCard(index) {
    var card = document.getElementById(index);
    card.style.backgroundImage = 'none';
}
// END PART 3 - TEST THE ENTIRE APP //



