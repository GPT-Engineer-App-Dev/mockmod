import { Box, Heading, Text } from "@chakra-ui/react";

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.cards = [];

    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard() {
    return this.cards.pop();
  }
}

class PokerHand {
  constructor(card1, card2) {
    this.holeCards = [card1, card2];
    this.communityCards = [];
  }

  addFlop(flop) {
    this.communityCards = this.communityCards.concat(flop);
  }

  addTurn(turn) {
    this.communityCards.push(turn);
  }

  addRiver(river) {
    this.communityCards.push(river);
  }

  getBestHand() {
    return [...this.holeCards, ...this.communityCards];
  }
}

class Game {
  constructor(players) {
    this.deck = new Deck();
    this.deck.shuffle();
    this.players = players.map((player) => ({
      name: player,
      hand: new PokerHand(this.deck.drawCard(), this.deck.drawCard()),
    }));
  }

  dealFlop() {
    const flop = [this.deck.drawCard(), this.deck.drawCard(), this.deck.drawCard()];
    this.players.forEach((player) => player.hand.addFlop(flop));
  }

  dealTurn() {
    const turn = this.deck.drawCard();
    this.players.forEach((player) => player.hand.addTurn(turn));
  }

  dealRiver() {
    const river = this.deck.drawCard();
    this.players.forEach((player) => player.hand.addRiver(river));
  }

  determineWinner() {
    return this.players[0].name;
  }
}

const Index = () => {
  const game = new Game(["Alice", "Bob", "Charlie"]);
  game.dealFlop();
  game.dealTurn();
  game.dealRiver();
  const winner = game.determineWinner();

  return (
    <Box>
      <Heading>Texas Hold'em Poker</Heading>
      <Text>Winner: {winner}</Text>
    </Box>
  );
};

export default Index;
