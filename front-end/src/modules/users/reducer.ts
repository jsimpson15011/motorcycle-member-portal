import * as t from './actionTypes';
import {IUser} from "./model";

const initialState: IUser[] = []

const reducer = (state = initialState, action: any): IUser[] => {
    const users = action.payload
    switch (action.type) {
        case t.GET:
            return users
        default:
            return state
    }
}

export default reducer