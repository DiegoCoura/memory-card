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
  const [characters, setCharacters] = useState([]);
  console.log(characters);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(URL);
      const responseJSON = await response.json();
      setCharacters(responseJSON.characters);
    };

    fetchCharacters();
  }, []);

  return (
    <>
      <ScoreBoard />
      <Board>
      {characters.map((character) => {
          return <Card key={character.id} character={character} />;
        })}
      </Board>
    </>
  );
}

export default App;
