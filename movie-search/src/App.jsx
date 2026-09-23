import {useState, useEffect} from 'react'
import MovieSearch from './MovieSearch.jsx';
import MovieCard from './MovieCard.jsx';
import MovieDetails from './MovieDetails.jsx';
const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

export default function App(){
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(''); 
  const [selectedMovie, setSelectedMovie] = useState('');
  const [err,setErr] = useState('');

  useEffect(()=>{
    if(!query) return;
    let ignore = false;
    fetchMovies(query).then(data => {
      if(!ignore){
        if(data.Response === "False"){
          setErr('Movies not found');
          setMovies([]);
        }else{
          setErr('');
          setMovies(data.Search); 
        }
        
      }
      
    });
    return ()=> {ignore = true}
    
  },[query]);

  function fetchMovies(searchQuery){
    return fetch(
      `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`
    ).then(res => res.json());
  }

  

  return(
    <>
      {selectedMovie ? (
        <div className="movie-detail-container">  
          <MovieDetails id={selectedMovie} onBack={()=> setSelectedMovie('')} />
        </div>
        ): 
        <div className="movie-container">
          <MovieSearch onSearch={value => {
            if(!value.trim()){
              setErr("Don't leave anything blank");
              return;
            }
            setErr('');
            setQuery(value);
          }} />

          <MovieCard movies ={movies} onSelect={setSelectedMovie} error ={err}/>
        </div>
      }
    </>
  )
  
    
    

}