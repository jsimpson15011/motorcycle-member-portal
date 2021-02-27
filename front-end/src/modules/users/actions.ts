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
    id: number
): AppThunk => async dispatch => {
    const response = await axios.get("/api/users")
    dispatch(
        getUser(response.data)
    )
}