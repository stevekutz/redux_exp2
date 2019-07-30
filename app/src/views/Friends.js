import React from 'react';
import {connect} from 'react=redux';

import {addFriend} from './actions/actionsFriends';

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
               <h4>Goal </h4>    
               <p>Total</p>
               {this.props.friends.map( (person, index) =>  (
                    <Friend peep = {person} key = {index}/>
               ))}
               <form>
                <input 
                    type = 'text'
                    value = {this.state.newFriend}
                    onChange = {this.handleInputs}
                    placeholder = 'placeholder text'    
                />
                <button onClick = { () => {this.addFriend_h} }> Add Friend</button>
               </form> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        friends: state.friends.friends
    }
}

export default connect(
    mapStateToProps,
    {addFriend}
)(Friends)