import "../styles/startpage.css";
import sharinganIMG from "../assets/imgs/sharingan.png";
import narutoIcon from "../assets/imgs/naruto-icon.png";
import madNaruto from "../assets/imgs/mad-naruto.png";
import narutoGif from "../assets/imgs/naruto-win.gif";

export default function StartPage({ startGame, gameStatus }) {
  return (
    <div className="start-page">
      <div className="naruto-container">
        {(gameStatus === "" && (
          <img src={narutoIcon} className="naruto-icon" alt="happy naruto" />
        )) ||
          (gameStatus === "lose" && (
            <img src={madNaruto} className="mad-naruto" alt="mad naruto" />
          )) ||
          (gameStatus === "win" && (
            <img
              src={narutoGif}
              className="naruto-gif"
              alt="ninjas lifting up naruto joyfully"
            />
          ))}
      </div>
      <button className="start-button" onClick={startGame}>
        <img className="sharingan-icon" src={sharinganIMG} alt="" />
        {(gameStatus === "" && <p>Start</p>) ||
          (gameStatus === "win" && <p>Restart</p>) ||
          (gameStatus === "lose" && <p>Try again!</p>)}
      </button>
    </div>
  );
}
