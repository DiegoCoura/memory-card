import '../styles/scoreboard.css'
import narutoScroll from "../assets/imgs/naruto-scroll.png"

export default function ScoreBoard ({ topScore, currScore }){
    return(
        <>
            <div className="scoreboard">
                <img src={narutoScroll} className="scoreboard-bg" alt="naruto scroll" />
                <p>Record: {topScore}</p>
                <p>Score: {currScore}</p>
            </div>
        </>
    )
}