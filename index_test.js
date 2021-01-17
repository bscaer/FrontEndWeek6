var expect = chai.expect;
var assert = chai.assert;

describe('MyFunctions', function() {
    describe('#Deck.getRandomInt', function() {
        it('should return a random number', function() {
            var x = Deck.getRandomInt(5);
            assert.isNumber(x);
        });
    }),
    describe('#Deck.numCardsRemaining', function() {
        it('after instantiating a Deck, it should return number of cards in a full deck', function() {
            let deck = new Deck();
            var x = deck.numCardsRemaining();
            expect(x).to.equal(52);
        });
    }),
    describe('#Deck.getNextCard', function() {
        it('after instantiating a Deck and dealing 1 card, it should return an object of type Card and number of cards in a full deck minus one', function() {
            let deck = new Deck();
            var card = deck.getNextCard();
            expect(card).instanceOf(Card);
            expect(card.suitName).oneOf(Object.values(SUITS));
            expect(card.faceName).oneOf(Object.values(FACES));
            var x = deck.numCardsRemaining();
            expect(x).to.equal(51);
        });
    }),
    describe('#Dealer.dealACard', function() {
        it('after instantiating a Dealer and dealing 1 card, it should return an object of type Card and number of cards in a full deck minus one', function() {
            let dealer = new Dealer();
            var card = dealer.dealACard();
            expect(card).instanceOf(Card);
            var x = dealer.numCardsRemaining();
            expect(x).to.equal(51);
        });
    });
    describe('#Player.awardPoints', function() {
        it('after instantiating a Player and awarding it 1 point, it should have 1 point', function() {
            let points = 1;
            let player = new Player();
            player.awardPoints(points);
            expect(player.points).to.equal(points);
        });
    });
    describe('#Game', function() {
        it('after instantiating a Game object, it should have one Dealer object and two Player objects and the names should match', function() {
            let dealerName = "Pusheen";
            let player1Name = "Totoro";
            let player2Name = "Mai";
            let game = new Game(dealerName, player1Name, player2Name);
            expect(game.dealer).instanceOf(Dealer);
            expect(game.dealer.name).to.equal(dealerName);
            expect(game.player1).instanceof(Player);
            expect(game.player1.name).to.equal(player1Name);
            expect(game.player2).instanceof(Player);
            expect(game.player2.name).to.equal(player2Name);
        });
    });
});