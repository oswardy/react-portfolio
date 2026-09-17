import { useState, useEffect } from "react";


export default function DigitalClock(){
    const [time,setTime] = useState(new Date());

    useEffect(()=>{
        const intervalId = setInterval( ()=>{
            setTime(new Date());
        }, 1000);

        return ()=>{
            clearInterval(intervalId);
        }
    },[])

    function timeFormat(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours > 12 ? 'PM':'AM';

        hours = hours % 12 || 12;
        
        return(`${padZero(hours)} ${padZero(minutes)} ${padZero(seconds)} ${meridiem}`)
    }

    function padZero(number){
        // if(number >= 10) return number;
        // const newNo = '0' + number;
        // return newNo;
        return number < 10 ? '0' + number : number;
    }

    return(
        <div className='component-wrapper natural-img'>
            {/* <h3>Digital Clock:</h3> */}
            <div className='clock-container'>
                <div className='clock'>
                    <span>{timeFormat()}</span>
                    
                </div>
            </div>
            <footer>Digital Clock</footer>
        </div>
    )
}