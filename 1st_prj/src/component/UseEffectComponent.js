import { useState, useEffect } from "react"
export default function(){

    const [countA, setCountA] = useState(0)
    const [countB, setCountB] = useState(0)
    const btnAddAOnClick = function(){
        setCountA( prevValue => ++prevValue );
    }
    const btnAddBOnClick = function(){
        setCountB( prevValue => ++prevValue );
    }

    useEffect(
        () => {
            console.log(`All Variable initialized`)
        }, []
    )

    useEffect(
        () => {
            console.log(`some variable Changed`)
        }
    )


    useEffect(
        () => {
            console.log(`CountA Changed : ${countA}`)
        },
        [countA]
    )

    useEffect(
        () => {
            console.log(`CountB Changed : ${countB}`)
        },
        [countB]
    )

    return (
        <div>
            <p>countA : { countA }</p>
            <p>countB : { countB }</p>
            <button onClick={btnAddAOnClick}>Add CountA</button>
            <button onClick={btnAddBOnClick}>Add CountB</button>
        </div>
    )

}