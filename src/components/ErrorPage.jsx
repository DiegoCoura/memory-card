export default function ErrorPage (error) {
    return(
        <>
            <div className="error-page">
                <h1>Ops... Something went wrong</h1>
                <h1>{error}</h1>
            </div>
        </>
    )
}