const SUITS = Object.freeze({
    1: 'SPADES',
    2: 'HEARTS',
    3: 'DIAMONDS',
    4: 'CLUBS'
  });

  const FACES = Object.freeze({
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
  });

class Card {
    constructor(suit, face) {
        this.suit = suit;
        this.face = face;

        this.suitName = SUITS[suit];
        this.faceName = FACES[face];
    }
}

class Deck {
    constructor() {
        this.cards = [];
        let suit;
        for (suit in SUITS) {
            let face;
            for (face in FACES) {
                this.cards.push(new Card(suit, face));
            }
        }
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    numCardsRemaining() {
        return this.cards.length;
    }

    getNextCard() {
        if (this.numCardsRemaining() == 0) {
            return null;
        }
        
        let randomCardIndex = Deck.getRandomInt(this.cards.length);
        let card = this.cards[randomCardIndex];
        this.cards.splice(randomCardIndex, 1);
        return card;
    }
}

class Dealer {
    constructor(name) {
        this.name = name;
        this.deck = new Deck();
    }

    numCardsRemaining() {
        return this.deck.numCardsRemaining();
    }

    dealACard() {
        return this.deck.getNextCard();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
    }

    awardPoints(numPoints) {
        this.points += numPoints;
    }
}

class Game {
    constructor(dealerName, player1Name, player2Name) {
        this.dealer = new Dealer(dealerName);
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
    }
    
    playWar() {  
        while (this.dealer.numCardsRemaining() > 0) {
            let player1Card = this.dealer.dealACard();
            let player2Card = this.dealer.dealACard();

            let winningPlayer = null;
            let message = "";
            if (player1Card != null && player2Card != null) {
                message += `${this.dealer.name} deals card with suit ${player1Card.suitName} and face ${player1Card.faceName} to ${this.player1.name}.\n`;
                message += `${this.dealer.name} deals card with suit ${player2Card.suitName} and face ${player2Card.faceName} to ${this.player2.name}.\n`;

                if (Number(player1Card.face) > Number(player2Card.face)) {
                    winningPlayer = this.player1;
                } else if (Number(player2Card.face) > Number(player1Card.face)) {
                    winningPlayer = this.player2;
                }
                if (winningPlayer == null) {
                    message += `Neither player wins the match.\n`;
                } else {
                    winningPlayer.awardPoints(1);
                    message += `${winningPlayer.name} wins the match.\n`;
                    message += `${this.player1.name} has ${this.player1.points} points and ${this.player2.name} has ${this.player2.points}.\n`;
                }

                message += `${this.dealer.numCardsRemaining()} cards left.`
                alert(message);
            }
        }

        let message = `Game of war finishes.\n`;
        message += `${this.player1.name} has ${this.player1.points} points and ${this.player2.name} has ${this.player2.points}.\n`;
        let winningPlayer = null;
        if (this.player1.points > this.player2.points) {
            winningPlayer = this.player1;
        } else if (this.player2.points > this.player1.points) {
            winningPlayer = this.player2;
        }

        if (winningPlayer == null) {
            message += `The game of war is a tie.`;
        } else {
            message += `${winningPlayer.name} wins the game of war.`;
        }

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

    // The operation is "Play a Game of War"
    if (operation == "0") {
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

        let game = new Game(dealerName, player1Name, player2Name);
        game.playWar();
    } 
    
    // The operation is "Exit"
    else if (operation == "1") {
        // Exit the loop.
        exit = true;
    }
}
