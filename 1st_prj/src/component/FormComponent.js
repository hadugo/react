export default function(){

    let greetings = "hellow"

    const changeGreetings = function(){
        greetings = (greetings === 'hellow') ? 'hi' : 'hellow'
        document.getElementsByTagName('p')[0].textContent = greetings
    }
    
    return (
        <div>
            <button onClick={ changeGreetings }>Change</button>
            <p>{ greetings }</p>
        </div>
    )
}