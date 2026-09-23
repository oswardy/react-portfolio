
export default function MovieCard({movies, error, onSelect}){
    if (error) return <p className="error">{error}</p>;

    return(
        <div className="movie-list">
            {movies.map(movie =>(
                <div className="movie-item" onClick= {() => onSelect(movie.imdbID)} key={movie.imdbID}>
                    
                    <img src={movie.Poster} alt={movie.Title} />
                    <p className="movie-title">{movie.Title}</p>
                    <p className="movie-year">{movie.Year}</p>
                </div>
            ))}
        </div>

    )
}