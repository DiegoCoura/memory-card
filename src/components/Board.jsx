import "../styles/board.css";

export default function Board({ children }) {
  return (
    <>
      <div className="board">
        {children}
      </div>
    </>
  );
}
