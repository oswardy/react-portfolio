import {useState} from 'react'

export default function WeatherSearch({onSearch}){

    const [weatherInput, setWeatherInput] = useState('');

    return(
        <div>
            <input className="input-search" value={weatherInput} 
                onChange={e => setWeatherInput(e.target.value) } 
                onKeyDown={e =>{
                    if(e.key === 'Enter'){
                        onSearch(weatherInput);
                    }
                }}
                placeholder='Search City... (Enter to search)'/>
            {/* <button className="search-btn" onClick={()=> onSearch(weatherInput)}>Search</button> */}
        </div>
    )
}