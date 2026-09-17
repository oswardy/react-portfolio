import { useState, useEffect, useRef } from "react";


export default function StopWatch(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startIntervalRef = useRef(0);


    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
            setElapsedTime(Date.now() - startIntervalRef.current)
            },10);

            return ()=>{
                clearInterval(intervalIdRef.current);
            }
        }
        
    },[isRunning]);

    function startTime(){
        setIsRunning(true);
        startIntervalRef.current = Date.now() - elapsedTime;
    }

    function stopTime(){
        setIsRunning(false);
    }

    function resetTime(){
        setElapsedTime(0);
        setIsRunning(false);

    }

    function timer(){
        let hours = Math.floor(elapsedTime / (1000 *60 *60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime %1000) /10);

        hours = String(hours).padStart(2,'0');
        minutes = String(minutes).padStart(2,'0');
        seconds = String(seconds).padStart(2,'0');
        milliseconds = String(milliseconds).padStart(2,'0');
        return (`${hours}:${minutes}:${seconds}:${milliseconds}`)
    }


    return(
        <div className='component-wrapper darksky-img'>
            
            <span className='timer-display'>{timer()}</span>
            <div className='button-container'>
                <button className="btn-start" onClick={startTime} >Start</button>
                <button className="btn-stop" onClick={stopTime}>Stop</button>
                <button className="btn-reset" onClick={resetTime}>Reset</button>
            </div>
            <footer>Stopwatch</footer>
        </div>
    )
}