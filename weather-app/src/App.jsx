import { useState, useEffect } from 'react'
import './App.css'
import WeatherSearch from './WeatherSearch';
import WeatherCard from './WeatherCard';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isValidCity, setIsValidCity] = useState(false);
  const [err,setErr] = useState('');

  useEffect(()=>{
    if(!city) return;
    let ignore = false ;
    fetchWeather(city).then(data => {
      if(!ignore){
        if(data.cod !== 200) {
          setErr('Invalid city');
          setIsValidCity(false);
          return;
        };//prevent clash
        setCurrentWeather(data);
        setIsValidCity(true);
      }
    });
    return ()=> {ignore = true};
  },[city])

  useEffect(()=>{
    if(!city || !isValidCity) return;
    let ignore = false;
    fetchForecast(city).then(data =>{
      if(!ignore) setForecast(data.list)
    });
    return ()=> {ignore =true};
  },[city, isValidCity])


  
  

  function fetchWeather(city){
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    ).then(res=>res.json());
  }

  function fetchForecast(city){
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    ).then(res => res.json());
  }


  return (
    <div className="weather-container">
      <WeatherSearch onSearch = {value => {
        if(!value.trim()){
          setErr('Please do not leave anything blank ');
          return;
        }
        setErr('');
        setCity(value);
      }}/>
      <WeatherCard weather = {currentWeather} forecast ={forecast} error={err}/>     
      
    </div>
  )
}


