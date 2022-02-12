import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/singleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: "false" },
  { src: "/img/potion-1.png", matched: "false" },
  { src: "/img/ring-1.png", matched: "false" },
  { src: "/img/scroll-1.png", matched: "false" },
  { src: "/img/shield-1.png", matched: "false" },
  { src: "/img/sword-1.png", matched: "false" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [ChoiceOne, setchoiceOne] = useState(null);
  const [ChoiceTwo, setchoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    ChoiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };

  // Comparing Two selected cards
  useEffect(() => {
    if (ChoiceOne && ChoiceTwo) {
      if (ChoiceOne.src === ChoiceTwo.src) {
        setCards((preCards) => {
          return preCards.map((card) => {
            if (card.src === ChoiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        resetTurn();
      }
    }
  }, [ChoiceOne, ChoiceTwo]);

  // Reset Choices and Increase Turn
  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  console.log(cards);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>,
      <div className="cards-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
