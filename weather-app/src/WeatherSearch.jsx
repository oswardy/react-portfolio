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
                placeholder='Enter City Name..'/>
            {/* <button className="search-btn" onClick={()=> onSearch(weatherInput)}>Search</button> */}
        </div>
    )
}