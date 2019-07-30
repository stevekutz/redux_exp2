export const ADD_FRIEND = 'ADD_FRIEND';

// import {addFriend} from './actions/actionsFriends';

export const addFriend = newPeep => {
    console.log('newPeep ', newPeep);

    return {
        type: ADD_FRIEND,
        payload: newPeep
    };
};