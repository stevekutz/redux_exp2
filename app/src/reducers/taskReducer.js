// export const ADD_TASK = 'ADD_TASK';
// export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

import {ADD_TASK, TOGGLE_COMPLETE}   from '../actions/actionsTasks';

const initialState = {
    tasks: [
        {description: 'write code', completed: false, id: 1},
        {description: 'debug code', completed: true, id: 2},
    ]
}

function taskReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TASK:
            return {
                ...state,
/*
                tasks: [
                    ...state.tasks,
                    {description: action.payload, completed: false, id: Date.now() }
                ]    
*/                
                tasks: [
                    ...state.tasks, action.payload
                ]


            }
        
        case TOGGLE_COMPLETE:
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    if(item.id === action.payload) {
                        return {
                            ...item,
                            completed: !item.completed
                        }
                    } else {
                        return item;
                    }         
                })
            }

        default: 
            return state;
    }
}

export default taskReducer;