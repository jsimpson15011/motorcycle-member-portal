import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getUser} from "../selectors";
import {IUser} from "../model"
import * as t from "../actionTypes"
import {Formik, Form, Field} from "formik";
import {useHistory, useLocation} from "react-router-dom";

const LoginForm = ({user, dispatch}: { user: IUser, dispatch: any }) => {
    let history = useHistory();
    let location = useLocation();

    let {from}: any = location.state || {from: {pathname: "/"}}

    if (user.id === null) {
        return (
            <Formik
                initialValues={{
                    userName: '',
                    password: ''
                }}
                onSubmit={async (values) => {
                    dispatch({
                        type: t.LOGIN,
                        payload: {userName: values.userName, isAdmin: false, id: 3}
                    })
                    history.replace(from) //This probably will end up going in a redux thunk eventually
                }}
            >
                <Form>
                    <Field type="text" name="userName" id="userName"/>
                    <Field type="password" name="password" id="password"/>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        )
    } else {
        const handleLogout = ()=> {
            dispatch({type: t.LOGOUT, payload: {sessionId: 2}})
        }
        return (
            <button onClick={handleLogout}>
                Logout
            </button>
        )
    }
}

export default connect(
    createStructuredSelector({
        user: getUser
    })
)(LoginForm)