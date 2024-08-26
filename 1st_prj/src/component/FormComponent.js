import { useState } from "react"

export default function(param){

    console.log(param)

    return (
        <div>
            <p>{ param.value }</p>
        </div>
    )

}