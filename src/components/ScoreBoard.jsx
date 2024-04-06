import '../styles/scoreboard.css'

export default function ScoreBoard ({ topScore, currScore }){
    return(
        <>
            <div className="scoreboard">
                <img src="https://www.nicepng.com/png/full/419-4199514_alterar-exibio-de-spoiler-para-tipo-pergaminho-naruto.png" className="scoreboard-bg" alt="naruto scroll" />
                <p>Record: {topScore}</p>
                <p>Score: {currScore}</p>
            </div>
        </>
    )
}