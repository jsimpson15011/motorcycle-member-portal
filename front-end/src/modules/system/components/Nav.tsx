import React from "react";
import Home from "../../../pages/Home"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useLocation
} from "react-router-dom";
import {IUser} from "../model";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getUser} from "../selectors";
import LoginForm from "./LoginForm";

interface IProps {
    children: JSX.Element
    user: IUser
    path: string
    exact?: any
}

function PrivateRoute({children, user, ...rest}: IProps) {
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

function AdminRoute({children, user, ...rest}: IProps) {

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

const LoginPage = () => {
    let location = useLocation();

    let {from}: any = location.state || {from: {pathname: "/"}}

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <LoginForm/>
        </div>
    )
}

const Nav = ({user}:{user:IUser}) => {
    return (
            <Router>
                <nav className="header-nav">
                    <ul className="header-nav__list">
                        <li className="header-nav__item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="header-nav__item">
                            <Link to="/private">Private</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <AdminRoute user={user} exact path="/">
                        <div>
                            <Home/>
                        </div>
                    </AdminRoute>
                    <PrivateRoute user={user} path="/private">
                        <div>you're logged in.</div>
                    </PrivateRoute>
                    <AdminRoute user={user} path="/admin">
                        <div>Admin</div>
                    </AdminRoute>
                    <Route exact path="/login">
                        <div>Please Login</div>
                        <LoginPage/>
                    </Route>
                    <Route exact path="/privilege-page">
                        <div>
                            <h2>You do not have permission to view this page.</h2>
                            <Link to="/login">Please Log Out Here, and Log in with your admin account</Link>
                        </div>
                    </Route>
                </Switch>
            </Router>
    )
}

export default connect(
    createStructuredSelector( {
        user: getUser
    })
)(Nav)