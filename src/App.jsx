import { useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import { useEffect } from "react";
import Board from "./components/Board";
import Card from "./components/Card";

// const mockCards = {
//   id: 0,
//   name: "Naruto",
//   img: "foto",
// };
const URL = "https://narutodb.xyz/api/character?page=1&limit=8";

//create a shuffle function that will use the id (and Math.floor(Math.random) * arr.length)

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [charactersToDisplay, setCharactersToDisplay] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(URL);
        const responseJSON = await response.json();
        setCharacters(responseJSON.characters);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const shuffle = () => {
    const shuffledCardsIndexes = [];
    const shuffledCards = [];

    while (shuffledCardsIndexes.length < 5) {
      let randomNumber = Math.floor(Math.random() * characters.length);
      console.log(randomNumber);
      if (!shuffledCardsIndexes.includes(randomNumber)) {
        shuffledCardsIndexes.push(randomNumber);
        shuffledCards.push(characters[randomNumber]);
      }
    }
    return shuffledCards;
  };

  const handleClick = (e) => {
    const cardId = e.target.closest(".card").id;

    if (clickedCards.includes(cardId)) {
      setScore(0);
    } else {
      setClickedCards([...clickedCards, cardId]);
      setScore(score + 1);
    }
  };

  const startGame = () => {
    const shuffledCards = shuffle();
    setCharactersToDisplay(shuffledCards);
    setGameOn(true);
  };

  return (
    <>
      {gameOn && (
        <>
          <ScoreBoard />

          <Board>
            {charactersToDisplay.map((character) => {
              return (
                <Card
                  key={character.id}
                  id={character.id}
                  character={character}
                  onClick={handleClick}
                />
              );
            })}
          </Board>
        </>
      )}
      {!gameOn && <button onClick={startGame}>Começa porra</button>}
    </>
  );
}

export default App;
