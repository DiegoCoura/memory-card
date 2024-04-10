import ScoreBoard from "./ScoreBoard";
import Board from "./Board";
import Card from "./Card";

export default function GamePage({
  currScore,
  topScore,
  charactersToDisplay,
  onClick,
  isFlipped,
}) {
  return (
    <>
      <ScoreBoard currScore={currScore} topScore={topScore} />

      <Board>
        {charactersToDisplay.map((character) => {
          return (
            <Card
              key={character.id}
              id={character.id}
              character={character}
              onClick={onClick}
              isFlipped={isFlipped}
            />
          );
        })}
      </Board>
    </>
  );
}
