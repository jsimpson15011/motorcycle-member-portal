import {combineReducers} from "redux";
import system from './system';

export default combineReducers({
    [system.constants.NAME]: system.reducer
})