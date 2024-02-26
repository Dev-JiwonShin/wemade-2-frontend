// src/redux/reducers/index.js

import {combineReducers} from 'redux';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer
});
