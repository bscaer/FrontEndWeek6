// This is an implementation of the card game "War."
// A menu is displayed, allowing the user to choose to exit or play the game.
// When the game is played, the Dealer automatically deals one card to each of two Players from a Deck.
// The Player who played the higher card is awarded a point.
// Ties result in zero points for either Player.
// After each match the Players' cards are displayed, the winner of the match, and the score is displayed.
// After all cards have been played, the winner of the game is displayed, as well as the final score.

// A set of enums representing the suits in a deck of cards.
const SUITS = {
    1: 'SPADES',
    2: 'HEARTS',
    3: 'DIAMONDS',
    4: 'CLUBS'
  };

// A set of enums representing the faces for each suit in a deck of cards.
const FACES = {
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
    6: 'SIX',
    7: 'SEVEN',
    8: 'EIGHT',
    9: 'NINE',
    10: 'TEN',
    11: 'JACK',
    12: 'QUEEN',
    13: 'KING',
    14: 'ACE'
};

// The Card class represents one card.
class Card {
    // When a Card is instantiated, it is assigned a suit and a face
    // and the suit name and face name are assigned the corresponding string from the enums.
    constructor(suit, face) {
        this.suit = suit;
        this.face = face;

        this.suitName = SUITS[suit];
        this.faceName = FACES[face];
    }
}

// The Deck class represents one deck of 52 cards.
class Deck {
    constructor() {
        // A Deck contains an array of Card obje ts.
        this.cards = [];

        // For each suit, a Card object is instantiated for every face in that suit
        // and added to the array of Card objects.
        let suit;
        for (suit in SUITS) {
            let face;
            for (face in FACES) {
                this.cards.push(new Card(suit, face));
            }
        }
    }

    // getRandomInt returns a random number between zero and the specified max value minus one.
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    // The number of Card objects remaining in the array of Card objects.
    numCardsRemaining() {
        return this.cards.length;
    }

    // A Card object is randomly selected from the array of Card objects and returned.
    getNextCard() {
        // If the Deck is empty, null is returned.
        if (this.numCardsRemaining() == 0) {
            return null;
        }
        
        // Get a random value between 0 and the length of the array of Card objects minus 1. 
        let randomCardIndex = Deck.getRandomInt(this.cards.length);
        // Use that random value as an index into the array of Card objects to get one random Card object.
        let card = this.cards[randomCardIndex];
        // Remove that Card object from the array of Card objercts.
        this.cards.splice(randomCardIndex, 1);
        // Return the Card object.
        return card;
    }
}

// The Dealer class represents a card dealer.
class Dealer {
    // The Dealer's name is passed into the constructor and saved.
    constructor(name) {
        this.name = name;

        // A Deck object is instantiated.
        this.deck = new Deck();
    }

    // The number of cards remaining in the Deck object
    numCardsRemaining() {
        return this.deck.numCardsRemaining();
    }

    // Deal a Card by getting the next Card from the Deck and returning it.
    dealACard() {
        return this.deck.getNextCard();
    }
}

// The Player object represents a card player.
class Player {
    // The Player's name is passed into the constructor and saved.
    constructor(name) {
        this.name = name;

        // The Player starts with zero points.
        this.points = 0;
    }

    // Add 'numPoints' to the Player's score. 
    awardPoints(numPoints) {
        this.points += numPoints;
    }
}

// The Game class represents one game of war. 
class Game {
    // The Dealer's and both Players' names are passed into the constructor and
    // passed into the Dealer and Player object constructors.
    constructor(dealerName, player1Name, player2Name) {
        this.dealer = new Dealer(dealerName);
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
    }
    
    // playWar initiates a game of ward
    playWar() {  
        // While the Dealer has cards remaining, play another match.
        while (this.dealer.numCardsRemaining() > 0) {

            // Dealer a card to each player.
            let player1Card = this.dealer.dealACard();
            let player2Card = this.dealer.dealACard();

            // If two cards were dealt then update the message
            // with the dealer and player names and the card details.
            let winningPlayer = null;
            let message = "";
            if (player1Card != null && player2Card != null) {
                message += `${this.dealer.name} deals card with suit ${player1Card.suitName} and face ${player1Card.faceName} to ${this.player1.name}.\n`;
                message += `${this.dealer.name} deals card with suit ${player2Card.suitName} and face ${player2Card.faceName} to ${this.player2.name}.\n`;

                // If player1's card face is higher, he is the winner.
                if (Number(player1Card.face) > Number(player2Card.face)) {
                    winningPlayer = this.player1;

                // If player2's card face is higher, he is the winner.
                } else if (Number(player2Card.face) > Number(player1Card.face)) {
                    winningPlayer = this.player2;
                }

                // If the match was a tie then update the message to say so.
                if (winningPlayer == null) {
                    message += `Neither player wins the match.\n`;

                // Otherwise, award one point to the winning player and update
                // the message to identify the winner of the match and the score
                // for both players.
                } else {
                    winningPlayer.awardPoints(1);
                    message += `${winningPlayer.name} wins the match.\n`;
                    message += `${this.player1.name} has ${this.player1.points} points and ${this.player2.name} has ${this.player2.points}.\n`;
                }

                // Add the number of cards remaining in the deck to the message.
                message += `${this.dealer.numCardsRemaining()} cards left.`

                // Display the message.
                alert(message);
            }
        }

        // When the cards are exhausted, the game is finished. Display that in the message.
        let message = `Game of war finishes.\n`;
        // Display the players' scores in the message.
        message += `${this.player1.name} has ${this.player1.points} points and ${this.player2.name} has ${this.player2.points}.\n`;
        
        // The winning player is the one with the most points.
        let winningPlayer = null;
        if (this.player1.points > this.player2.points) {
            winningPlayer = this.player1;
        } else if (this.player2.points > this.player1.points) {
            winningPlayer = this.player2;
        }

        // If the players' scores were tied then add that to the message.
        if (winningPlayer == null) {
            message += `The game of war is a tie.`;

        // Otherwise, display the game winner in the message. 
        } else {
            message += `${winningPlayer.name} wins the game of war.`;
        }

        // Display the message.
        alert(message);
    }
}

// Set our 'exit' flag to false.
let exit = false;

// Continue prompting the user to choose from the menu until
// the user chooses to exit.
while (! exit) {
    // Prompt the user to choose an operation to perform.
    // Default to "0";
    let operation = prompt(`
        (0) Play a Game of War
        (1) Exit
        `,
        "0");

    // If the user chooses "0", the operation is "Play a Game of War"
    if (operation == "0") {

        // Prompt the user for the names for the dealer and both players.
        let dealerName = prompt(`
            Enter Name for Dealer
            `,
            "Chuck");

        let player1Name = prompt(`
            Enter Name for Player 1
            `,
            "Bob");

        let player2Name = prompt(`
            Enter Name for Player 2
            `,
            "Jane");

        // Instantiate the Game object with the three names
        let game = new Game(dealerName, player1Name, player2Name);

        // Start the game of ward.
        game.playWar();
    } 
    
    // If the user chooses "1", the operation is "Exit"
    else if (operation == "1") {
        // Exit the loop.
        exit = true;
    }
}
