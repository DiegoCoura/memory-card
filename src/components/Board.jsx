import "../styles/board.css";

export default function Board({ children }) {
  return (
    <>
      <div className="container">
        {children}
      </div>
    </>
  );
}
