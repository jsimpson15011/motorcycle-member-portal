import {Redirect, Route} from "react-router-dom";
import React from "react";
import {IUser} from "../../../model";

interface IProps {
    children: JSX.Element
    user: IUser
    path: string
    exact?: any
}

export const PrivateRoute = ({children, user, ...rest}: IProps) => {
    return (
        <Route
            {...rest}
            render={({location}) =>
                user.id ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

export const AdminRoute = ({children, user, ...rest}: IProps) => {
    return (
        <Route
            {...rest}
            render={({location}) => {
                if (user?.isAdmin) {
                    return children
                } else if (user.id !== null) {
                    return <Redirect
                        to={{
                            pathname: "/privilege-page",
                            state: {from: location}
                        }}
                    />
                } else {
                    return <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                }
            }
            }
        />
    );
}