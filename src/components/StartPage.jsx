import "../styles/startpage.css"
import sharinganIMG from "../assets/imgs/sharingan.png";
import narutoIcon from '../assets/imgs/happy-naruto.png'

export default function StartPage({ startGame }) {
  return (
    <div className="start-page">
    <div className="naruto-container">
        <img src={narutoIcon} className="happy-naruto" alt="happy naruto" />
    </div>
      <button className="start-button" onClick={startGame}>
        <img className="sharingan-icon" src={sharinganIMG} alt="" />
        <p>Start</p>
      </button>
    </div>
  );
}
