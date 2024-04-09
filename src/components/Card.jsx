import "../styles/card.css";

export default function Card({ id, character, onClick, isFlipped }) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={isFlipped ? "card flipped" : "card"}
    >
      <div className="flipper">
        <div className="front">
          <img src={character.banner}></img>
          <h3>{character.name}</h3>
        </div>
        <div className="back"></div>
      </div>
    </div>
  );
}
