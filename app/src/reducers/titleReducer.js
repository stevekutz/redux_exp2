import {UPDATE_TITLE} from '../actions/actionsTitle';

const initialState = {
    title: 'Original Store State'
};

function titleReducer (state = initialState, action) {
    switch (action.type) {
        case UPDATE_TITLE:
            return {
                ...state, title: action.payload
            };
        default:
            return state;    
    }
}

export default titleReducer;