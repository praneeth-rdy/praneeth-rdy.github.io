import React, { Component } from 'react'

class ClassClick extends Component {
    clickHandler(){
        console.log('Clicked')
    }
    render() {
        return (
            <div style={{ textAlign: 'center', margin: '5px' }}>
                <button onClick={this.clickHandler} >Click me</button>
            </div>
        )
    }
}

export default ClassClick
