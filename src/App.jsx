import { useState, useEffect, useRef } from "react";
import ScoreBoard from "./components/ScoreBoard";
import Board from "./components/Board";
import Card from "./components/Card";
import backgroundSong from "/sounds/battle-song.mp3";
import muteIcon from "./assets/imgs/mute.png";
import playIcon from "./assets/imgs/play.png";
import StartPage from "./components/StartPage";

const baseURL = "https://dattebayo-api.onrender.com/characters";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableCharacters, setAvailableCharacters] = useState([]);
  const [charactersToDisplay, setCharactersToDisplay] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [playSong, setPlaySong] = useState(false);
  const bgSongRef = useRef(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const onlyAvailableBanners = [];
        const response = await fetch(baseURL);
        const responseJSON = await response.json();
        for (const character of responseJSON.characters) {
          const bannerAvailable = await fetch(character.images[0]);
          if (bannerAvailable.ok) {
            const currCard = {
              id: character.id,
              name: character.name,
              banner: character.images[0],
            };
            onlyAvailableBanners.push(currCard);
          }
        }
        setAvailableCharacters(onlyAvailableBanners);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const shuffle = () => {
    const shuffledCardsIndexes = [];
    const shuffledCards = [];

    while (shuffledCardsIndexes.length < 4) {
      let randomNumber = Math.floor(Math.random() * availableCharacters.length);
      if (!shuffledCardsIndexes.includes(randomNumber)) {
        shuffledCardsIndexes.push(randomNumber);

        shuffledCards.push(availableCharacters[randomNumber]);
      }
    }

    const shuffledIds = shuffledCards.map((card) => card.id);

    const noFreeOptions = (arr, target) =>
      target.every((id) => arr.includes(id));
    if (noFreeOptions(clickedCards, shuffledIds) === true) {
      return shuffle();
    }

    return shuffledCards;
  };

  const resetGame = () => {
    setScore(0);
    setGameOn(false);
    setClickedCards([]);
  };

  const handleClick = (e) => {
    setIsClicked(true);
    if (isClicked) return;

    const cardId = e.target.closest(".card").id;

    if (clickedCards.includes(cardId)) {
      resetGame();
    } else {
      setClickedCards([...clickedCards, cardId]);
      setScore(score + 1);
      if (score >= topScore) {
        setTopScore(score + 1);
      }
      if (score === availableCharacters.length) {
        console.log("You win");
      }
      const shuffledCards = shuffle();
      setTimeout(() => {
        setCharactersToDisplay(shuffledCards);
      }, 800);
    }

    setIsFlipped(true);
    setTimeout(() => {
      setIsFlipped(false);
      setIsClicked(false);
    }, 1300);
  };

  const startGame = () => {
    const shuffledCards = shuffle();
    setCharactersToDisplay(shuffledCards);
    setGameOn(true);
  };

  const toggleBgSong = () => {
    if (playSong) {
      bgSongRef.current?.pause();
      setPlaySong(false);
    } else {
      bgSongRef.current?.play();
      bgSongRef.current.volume = 0.3;
      setPlaySong(true);
    }
  };

  return (
    <>
      {gameOn ? (
        <>
          <ScoreBoard currScore={score} topScore={topScore} />

          <Board>
            {charactersToDisplay.map((character) => {
              return (
                <Card
                  key={character.id}
                  id={character.id}
                  character={character}
                  onClick={handleClick}
                  isFlipped={isFlipped}
                />
              );
            })}
          </Board>
        </>
      ) : (
        <>
          <StartPage startGame={startGame} />{" "}
        </>
      )}

      <button onClick={toggleBgSong} type="button" className="toggle-bg-song">
        {!playSong ? (
          <img src={muteIcon} className="play-icon" />
        ) : (
          <img src={playIcon} className="play-icon" />
        )}
      </button>

      <audio ref={bgSongRef} loop src={backgroundSong} />
    </>
  );
}

export default App;
