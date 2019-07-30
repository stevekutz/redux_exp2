// export const ADD_FRIEND = 'ADD_FRIEND';

import {ADD_FRIEND} from '../actions/actionsFriends';

const initialState = {
    friends: [
        "Joe", "Mary", "Sue"
    ],
    goal: 10,

};


export const friendsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FRIEND:
            return {
                ...state, friends: [...state.friends, action.payload]
            }
        default: 
            return state;    
    }

}

export default friendsReducer;