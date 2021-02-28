import * as t from './actionTypes'
import {IUser} from "./model";
import axios from "axios";
import {AppThunk} from "../index";

const getUser = (users: IUser[]) => ({
    type: t.GET,
    payload: { users }
})

export const fetchUser = (
    id?: number
): AppThunk => async dispatch => {
    const response = await axios.get("/api/users")
    dispatch(
        getUser(response.data)
    )
}

export const updateUser = (
    userInfo: IUser, id?: number|null
): AppThunk => async dispatch => {
    await axios.post(id ? "/api/users/" + id : "/api/users", {...userInfo})

    const users = await axios.get("/api/users")
    dispatch(
        getUser(users.data)
    )
}