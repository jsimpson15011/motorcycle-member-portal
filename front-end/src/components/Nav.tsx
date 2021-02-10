import React, {createContext, useContext, useState} from "react";
import Home from "../pages/Home"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import {IUser} from "../common/types";

const fakeAuth = {
    isAuthenticated: false,
    signin(cb: { (): void; (...args: any[]): void; }) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100)
    },
    signout(cb: { (): void; (...args: any[]): void; }) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100)
    }
}

interface IauthContext {
    user: IUser | null;

    signIn(param: () => void): void;

    signOut(param: () => void): void;

    signInAdmin(param: () => void): void;
}

const authContext = createContext<IauthContext>({
    user: null,
    signOut(param: () => void) {
    },
    signIn(param: () => void) {
    },
    signInAdmin(param: () => void) {
    }
});


interface IProps {
    children: JSX.Element
    path: string
    exact?: any
}

const ProvideAuth = ({children}: { children: JSX.Element }) => {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

function useAuth() {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState<IUser | null>(null)

    const signIn = (cb: () => void) => {
        return fakeAuth.signin(() => {
            setUser({
                userName: "test_user",
                isAdmin: false
            });
            cb();
        })
    }

    const signInAdmin = (cb: () => void) => {
        return fakeAuth.signin(() => {
            setUser({
                userName: "admin",
                isAdmin: true
            })
            cb();
        })

    }

    const signOut = (cb: () => void) => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        })
    }

    return {
        user,
        signIn,
        signInAdmin,
        signOut
    }
}

function PrivateRoute({children, ...rest}: IProps) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth.user ? (
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

function AdminRoute({children, ...rest}: IProps) {
    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) => {
                if (auth.user?.isAdmin) {
                    return children
                } else if (auth.user) {
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

const AuthButton = () => {
    let history = useHistory();
    let auth = useAuth();

    return auth.user ? (
            <p>
                Welcome!{""}
                <button
                    onClick={() => {
                        auth.signOut(() => history.push("/"))
                    }}>
                    Sign Out
                </button>
            </p>
        ) :
        (
            <p>You are not logged in.</p>
        )
}

const LoginPage = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let {from}: any = location.state || {from: {pathname: "/"}}
    let login = () => {
        auth.signIn(() => {
            history.replace(from)
        })
    }
    let adminLogin = () => {
        auth.signInAdmin(() => {
            history.replace(from)
        })
    }

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log In</button>
            <button onClick={adminLogin}>admin log in</button>
        </div>
    )
}

const Nav = () => {
    return (
        <ProvideAuth>
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
                    <AdminRoute exact path="/">
                        <div>
                            <Home/>
                            <AuthButton/>
                        </div>
                    </AdminRoute>
                    <PrivateRoute path="/private">
                        <div>you're logged in.</div>
                    </PrivateRoute>
                    <AdminRoute path="/admin">
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
        </ProvideAuth>

    )
}

export default Nav