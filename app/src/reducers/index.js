import {combineReducers} from 'redux';

import titleReducer from './titleReducer';
import taskReducer from './taskReducer';
import counterReducer from './counterReducer';
import friendsReducer from './friendsReducer';

export default combineReducers({
    titleReducer,
    tasks: taskReducer,
    counterReducer,
    friends: friendsReducer
});