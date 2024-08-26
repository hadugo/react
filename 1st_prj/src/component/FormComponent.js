export default function(){

    const okClick = function(){
        console.log("ok Clicked")
    }

    const showData = function(event, param){
        console.log(event)
        console.log(param)
    }
    
    return (
        <div>
            <button onClick={ okClick }>OK</button>
            <button onClick={ ()=>{ console.log("cancel Clicked") } }>Cancel</button>
            <button onClick={ (event)=>{ showData(event, 'hellow') } }>ShowData</button>
        </div>
    )
}