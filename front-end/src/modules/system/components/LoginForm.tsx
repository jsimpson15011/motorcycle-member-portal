import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getUser} from "../selectors";
import {IUser} from "../model"
import * as t from "../actionTypes"
import { useFormik } from "formik";
import * as yup from 'yup';
import {useHistory, useLocation} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";

const validationSchema = yup.object({
    userName: yup
        .string()
        .required('User name or Email is Required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
})

const LoginForm = ({user, dispatch}: { user: IUser, dispatch: any }) => {
    let history = useHistory();
    let location = useLocation();

    let {from}: any = location.state || {from: {pathname: "/"}}

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
        dispatch({
            type: t.LOGIN,
            payload: {userName: values.userName, isAdmin: values.userName === "admin", id: 3}
        })
        history.replace(from) //This probably will end up going in a redux thunk eventually
    }
    })

    if (user.id === null) {
        return (
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="userName"
                        name="userName"
                        label="User Name or Email"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </form>
        )
    } else {
        const handleLogout = ()=> {
            dispatch({type: t.LOGOUT, payload: {sessionId: 2}})
        }
        return (
            <Button onClick={handleLogout}>
                Logout
            </Button>
        )
    }
}

export default connect(
    createStructuredSelector({
        user: getUser
    })
)(LoginForm)