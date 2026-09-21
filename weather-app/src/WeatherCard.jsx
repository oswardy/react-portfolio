

export default function WeatherCard({weather, forecast, error}){
    if (error) return <p className="error">{error}</p>;
    if (!weather) return;

    const cityTime = new Date(Date.now() + 
    (new Date().getTimezoneOffset() * 60000) + 
    (weather.timezone * 1000)
    );

    const windMph = weather.wind.speed * 2.23694;
    
    const dateString = cityTime.toLocaleDateString('en-US',{
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    // const timeString = cityTime.toLocaleTimeString('en-US',{
    //     hour: 'numeric',
    //     minute: '2-digit',
    //     hour12: true,
    // });
    const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const dailyForecast = forecast.filter(item => 
        item.dt_txt.includes('12:00:00')
        
    ).slice(1);
    

    return(
        <div className="weather-card-wrapper">
            <h2>{weather.name} {weather.sys.country}</h2>
            <p>{dateString}</p>
            <div className="weather-main">
                <div className="weather-left">
                    <img className="img-sky" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} /> 
                    <p>{Math.round(weather.main.temp)}°C</p>
                    
                    <p>{weather.weather[0].description}</p>
                </div>
                <div className="weather-right">
                    <div>
                        <p>{Math.round(weather.main.feels_like)}°C</p>
                        <p>Feel</p>
                    </div>
                    <div>
                        <p>{windMph.toFixed(1)}mph</p>
                        <p>Wind</p>
                    </div>
                    <div>
                        <p>{weather.main.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                    <div>
                        <p>{weather.clouds.all}%</p>
                        <p>Cloudiness</p>
                    </div>
                    <div>
                        <p>{sunrise}</p>
                        <p>Sunrise</p>
                    </div>
                    <div>
                        <p>{sunset}</p>
                        <p>Sunset</p>
                    </div>
                    
                    
                </div>
            </div>
            
            <div className="weather-forecast">
                {dailyForecast.map(item =>{
                    const day= new Date(item.dt*1000).toLocaleDateString('en-US',{
                        weekday:'long'
                    });
                    return(
                        <div className="forecast-item" key={item.dt}>
                            <p>{day}</p>
                            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
                            <p>{Math.round(item.main.temp)}°C</p>
                        </div>
                    )
                })}
            </div>
            
        </div>

    )

}