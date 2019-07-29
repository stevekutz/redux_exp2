export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

// addTask, toggleTask
export const addTask = someNewTask => {   // random name
    console.log(' someNewTake ', someNewTask);

    return {
        type: ADD_TASK,
        payload: someNewTask //   random name
    };
};


export const toggleTask = id => {
    return {
        type: TOGGLE_COMPLETE,
        payload: id
    }
} 