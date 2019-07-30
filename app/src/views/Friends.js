import React from 'react';
import {connect} from 'react-redux';

import {addFriend} from '../actions/actionsFriends';
import Friend from './Friend';

class Friends extends React.Component{
    state = {
        newFriend: '',
        age: 21
    }

    addFriend_h = ev => {
        ev.preventDefault();
        this.props.addFriend(this.state.newFriend); // call action creator
        this.setState({newFriend: ''})
    }

    handleInputs = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {

        return(
            <div className = 'friendsContainer'>
               <h4>Goal {this.props.goal}</h4>    
               <p>Total</p>
               {this.props.friends.map( (person, index) =>  (
                    <Friend peep = {person} key = {index}/>
               ))}
               <form>
                <input 
                    type = 'text'
                    name = 'newFriend'
                    value = {this.state.newFriend}
                    onChange = {this.handleInputs}
                    placeholder = 'placeholder text'    
                />
                <button onClick = {this.addFriend_h}> Add Friend</button>
               </form> 
            </div>
        )
    }
}

// NO!!!   <button onClick = { () => {this.addFriend_h} }> Add Friend</button>

const mapStateToProps = state => {
    return {
        friends: state.friends.friends,
        goal: state.friends.goal,

    }
}

export default connect(
    mapStateToProps,
    {addFriend}
)(Friends)