import {combineReducers} from 'redux';

import titleReducer from './titleReducer';
import taskReducer from './taskReducer';
import counterReducer from './counterReducer';

export default combineReducers({
    titleReducer,
    tasks: taskReducer,
    counterReducer
});