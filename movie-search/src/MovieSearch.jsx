import {useState} from 'react'

export default function MovieSearch({onSearch}){
    const [input, setInput] = useState('');

    return(
        <div>
            <input className="search-input" placeholder="Search Movie... (Enter to search)"
            value={input} onChange={e=> setInput(e.target.value)}
            onKeyDown={e => {
                if(e.key === "Enter"){
                    onSearch(input);
                }
            }} />
            
        </div>
    )
}