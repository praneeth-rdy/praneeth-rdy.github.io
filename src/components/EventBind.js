import React, { Component } from 'react'

export class EventBind extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             message: 'Hello'
        }
    }
    
    clickHandler(){
        if(this.state.message == 'Hello'){
            this.setState({
                message: 'Changed'
            })
        } else{
            this.setState({
                message: 'Hello'
            })
        }
        
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <button onClick={() => this.clickHandler()} >Click</button>
            </div>
        )
    }
}

export default EventBind
