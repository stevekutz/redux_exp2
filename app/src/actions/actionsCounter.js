export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

// import {increment, decrement}

// no input provided, so payload is null
export const increment = () => {
    return {
        type: INCREMENT,
        payload: null,  
    }
};

export const decrement = () => {
    return {
        type: DECREMENT,
        payload: null
    }
};

export const reset = () => {
    return {
        type: RESET,
        payload: null
    }
}