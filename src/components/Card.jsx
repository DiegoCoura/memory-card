export default function Card ({ id, character, onClick }) {
    return (
        <>
            <div id={id} className="card" onClick={onClick}>            
                <img src={character.images[0]}></img>
                <h3>{character.name}</h3>
            </div>
        </>
    )
}