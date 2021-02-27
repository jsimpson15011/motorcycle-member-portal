import {combineReducers} from "redux";
import system from './system';
import users from "./users";

export default combineReducers({
    [system.constants.NAME]: system.reducer,
    [users.constants.NAME]: users.reducer
})