import * as t from './actionTypes';
import {IUser} from "./model";

const initialState: IUser = {
    userName: null,
    isAdmin: null,
    id: null
}

const reducer = (state = initialState, action: any): IUser => {
    const user = action.payload
    switch (action.type) {
        case t.LOGIN:
            return {
                id: user.id,
                userName: user.userName,
                isAdmin: user.isAdmin
            }
        case t.LOGOUT:
            return {
                id: null,
                userName: null,
                isAdmin: null
            }
        default:
            return state
    }
}

export default reducer