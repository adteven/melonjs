var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);
console.log(hand.toString());