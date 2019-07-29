import React, {Component} from 'react';
import {connect} from 'react-redux';
import {increment, decrement, reset} from '../actions/actionsCounter';
import './counter.css';


class Counter extends Component {
    state = {
        count: 1010   
    }

    resetTenTen = () => {
        this.setState({
            count: 1010,
        })
    }

    addTenSteps = () => {
        
        for(let i = 0; i < 10; i++){
//            this.setState({count: this.props.countProp})
/*
            this.setState((prevState, props) => ({
                count: prevState.count + 1
            })  )
*/
/* 
            setTimeout( () =>  (
                this.props.increment(),
                this.setState((prevState, props) => ({
                    count: prevState.count + 1
                })  )
                ), 2000 );  
*/               
                setTimeout( () => this.props.increment(), 1000);

                this.setState((prevState, props) => ({
                    count: prevState.count + 1
                })  )
        }
    }

    render() {
        return (
            <div className = 'counterContainer'>
                <h5>Counter</h5>
                <h6> <span> Local count state: </span> {this.state.count} </h6>
                <h6> <span> Redux Counter value: </span> {this.props.countProp} </h6>
                <div className = 'counterControls'>
                    <div className = 'inc_dec'>
                        <button onClick = {() => {this.props.increment() }}>inc</button>
                        <button onClick = {() => {this.props.decrement() }}>dec</button>
                    </div>

                    <div className = 'special_counter'>
                        <button onClick = {() => {this.props.reset() }} >Reset to 10</button>
                        <button onClick = {this.resetTenTen}>reset local to 1010</button>
                        <button onClick = {this.addTenSteps}>Add 10 in dealyed steps {this.state.count} </button>
                    </div>
                </div>
            </div>
        )
    }
}





const mapStateToProps = state => {
    return {
        // countProp:  state.countVal
        countProp: state.counterReducer.countVal
    }
}

export default connect(
    mapStateToProps,
    {increment, decrement, reset}
)(Counter);
