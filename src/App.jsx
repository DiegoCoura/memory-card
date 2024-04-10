import { useState, useEffect, useRef } from "react";
import backgroundSong from "/sounds/battle-song.mp3";
import muteIcon from "./assets/imgs/mute.png";
import playIcon from "./assets/imgs/play.png";
import StartPage from "./components/StartPage";
import ErrorPage from "./components/ErrorPage";
import GamePage from "./components/GamePage";

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
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      const onlyAvailableBanners = [];
      try {
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

    while (noFreeOptions(clickedCards, shuffledIds)) {
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

    const cardId = Number(e.target.closest(".card").id);

    if (clickedCards.includes(cardId)) {
      resetGame();
      setGameStatus("lose");
    } else {
      setClickedCards([...clickedCards, cardId]);
      setScore(score + 1);

      if (score >= topScore) {
        setTopScore(score + 1);
      }
      if (score + 1 === 12) {
        resetGame();
        setGameStatus("win");
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
    setGameStatus("");
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
      {error && <ErrorPage />}
      {(isLoading && <h1>Loading...</h1>) ||
        (gameOn && !isLoading ? (
          <>
            <GamePage
              currScore={score}
              topScore={topScore}
              charactersToDisplay={charactersToDisplay}
              onClick={handleClick}
              isFlipped={isFlipped}
            />
          </>
        ) : (
          <>
            <StartPage startGame={startGame} gameStatus={gameStatus} />{" "}
          </>
        ))}

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
