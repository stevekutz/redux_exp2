import React from 'react';
import {connect} from 'react-redux';

import {updateTitle} from '../actions/actionsTitle';
import './views.css'; 

class Title extends React.Component {
    state = {
        newTitleText: ''
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name] : ev.target.value
        });
    }

    updateTitle = ev => {
        ev.preventDefault();
        this.props.updateTitle(this.state.newTitleText);
        this.setState({newTitleText: ''});    // reset input to blank
    }    

    render() {
        return (
            <div className = 'sharedState'> 
               <h6> <span>Shared state:</span> {this.props.title}</h6> 
               <input 
                type = 'text'
                name = 'newTitleText'
                value = {this.state.newTitleText}
                onChange = {this.handleChange}
               />
               <button onClick = {this.updateTitle}> Update Title</button>
            </div>
        );
    }
}


// 1) Don't FORGET this first
const mapStateToProps = state => {
    return {
        //title: state.title   BEFORE Combine Reducers
        title: state.titleReducer.title   // AFTER Combine Reducers
    };
};

// 2) NEXT THIS !!!
export default connect(
    mapStateToProps,
    {updateTitle}   // could be written {updateTitle: updateTitle}
)(Title);
