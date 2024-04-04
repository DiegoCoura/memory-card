export default function Card ({ character }) {
    return (
        <>
            <div className="card">            
                <img src={character.images[0]}></img>
                <h3>{character.name}</h3>
            </div>
        </>
    )
}