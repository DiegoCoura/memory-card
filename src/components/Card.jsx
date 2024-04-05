import "../styles/card.css";

export default function Card({ id, character, onClick }) {
  return (
    <div id={id} className="card" onClick={onClick}>
      <img src={character.banner}></img>
      <h3>{character.name}</h3>
    </div>
  );
}
