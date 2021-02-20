import React from "react";
import Home from "../../../../pages/Home"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {IUser} from "../../model";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getUser} from "../../selectors";
import LoginPage from "../../../../pages/LoginPage";
import {AdminRoute, PrivateRoute} from "./components/Routes";
import Permission from "../../../../pages/admin/Permission";
import Admin from "../../../../pages/admin/Admin";

const Nav = ({user}: { user: IUser }) => {
    return (
        <Router>
            <Switch>
                <PrivateRoute user={user} exact path="/">
                    <Home/>
                </PrivateRoute>
                <AdminRoute user={user} exact path="/admin">
                    <Admin/>
                </AdminRoute>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
                <Route exact path="/privilege-page">
                    <Permission/>
                </Route>
            </Switch>
        </Router>
    )
}

export default connect(
    createStructuredSelector({
        user: getUser
    })
)(Nav)