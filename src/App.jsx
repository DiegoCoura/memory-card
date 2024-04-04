import ScoreBoard from "./components/ScoreBoard";

const mockCards = {
  id: 0,
  name: "Naruto",
  img: "foto",
};

//create a shuffle function that will use the id (and Math.floor(Math.random) * arr.length)

function App() {
  return (
    <>
      <ScoreBoard />
    </>
  );
}

export default App;
