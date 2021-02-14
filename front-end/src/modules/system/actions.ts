import * as t from './actionTypes'
import {IUser} from "./model";

export const login = (user:IUser) => ({
    type: t.LOGIN,
    payload: { user }
})

export const logout = (sessionId:string) => ({
    type: t.LOGOUT,
    payload: { sessionId }
})