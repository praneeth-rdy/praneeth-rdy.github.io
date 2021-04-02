import React from 'react'

function FunctionClick() {

    function clickHandler(){
        console.log("Clicked")
    }
    return (
        <div style={{textAlign: 'center', margin: '5px'}}>
            <button onClick={clickHandler} >Click</button>
        </div>
    )
}

export default FunctionClick
