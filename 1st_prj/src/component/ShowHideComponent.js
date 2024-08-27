import { useState } from "react"
export default function(){

    const [isShow, setIsShow] = useState(true)
    const [visiblity, setVisiblity] = useState('visible')
    const btnOnClick = function(){
        console.log(`{isShow}/{visiblity}`)
        setIsShow(
            prevValue => {
                const newValue = !prevValue
                setVisiblity(newValue ? 'visible' : 'hidden')
                return newValue
            }
        )
    }

    return (
        <div>
           { isShow ? <h1>Helloworld!!!</h1> : null }
            <h1 style={{ visibility: isShow ? 'visible' : 'hidden '}}>Helloworld!!!</h1>
            <h1 style={{ visibility: visiblity }}>Helloworld!!!</h1>
            <button onClick={btnOnClick}> {isShow ? 'Hide' : 'show'} </button>
        </div>
    )

}