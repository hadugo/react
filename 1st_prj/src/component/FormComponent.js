import { useState } from "react"

export default function(){

    const [ greetings, setGreetings ] = useState("hellow")

    const changeGreetings = function(){
        const value = (greetings === 'hellow') ? 'hi' : 'hellow'
        setGreetings(value)
    }
    
    return (
        <div>
            <button onClick={ changeGreetings }>Change</button>
            <p>{ greetings }</p>
        </div>
    )

}