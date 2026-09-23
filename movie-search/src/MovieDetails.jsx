import {useState, useEffect} from 'react'
const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

export default function MovieDetails({id, onBack}){
    const [details,setDetails] = useState(null);

    
    useEffect(()=>{
        if(!id) return;
        let ignore = false;
        fetchMoviesDetails().then(data=>{
            if(!ignore){
                setDetails(data);
                console.log(data);
            }
        })
        
        return () => {ignore = true};
    },[id])

    if(!details) return null;

    function fetchMoviesDetails(){
        return fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
        ).then(res => res.json());
    }
    return(
        <div className="detail-container">
            
            <div className="detail-left">
                <button className="back-btn" onClick={onBack}>← Back</button> 
                
                <img src={details.Poster} alt={details.Title} />
            </div>
            
            <div className="detail-right">
                <div className="detail-right-header">
                    <h2>{details.Title}</h2>
                    <div>
                        <span style={{ color: 'gold' }}>★</span>
                        <span> {details.imdbRating}/10</span>
                    </div> 
                </div>
                
                <p>
                    {details.Year} · {details.Genre} · {details.Runtime}
                </p>
               
                <div className="details">
                    <p>Director: {details.Director}</p>
                    <p>Writer: {details.Writer}</p>
                    <p>Cast: {details.Actors}</p>

                    <p className="plot">{details.Plot}</p>

                </div>
                
            </div>    
       
        </div>
    )
}