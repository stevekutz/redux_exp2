import React from 'react';
import {connect} from 'react-redux';

import {updateTitle} from '../actions/actionsTitle';
//import './views.css'; 
import '../styles/views.css';

class Title2 extends React.Component {
    state = {
        newTitleText: this.props.titleProp
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name] : ev.target.value
        });
    }

    updateTitle = ev => {
        ev.preventDefault();
        this.props.updateTitle(this.state.newTitleText);
        // we want updated state to populate input field
        //   this.setState({newTitleText: ''});    // reset input to blank
    }    

    render() {

        return (
            <div className = 'sharedState'> 
               <h6> <span>Shared state:</span> {this.props.titleProp}</h6> 
    
               <input 
                type = 'text'
                name = 'newTitleText'   // passed to handler
                value = {this.state.newTitleText}   // shows in text field
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
        titleProp: state.titleReducer.title   // AFTER Combine Reducers
    };
};

// 2) NEXT THIS !!!
export default connect(
    mapStateToProps,
    {updateTitle}   // could be written {updateTitle: updateTitle}
)(Title2);
