import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Screen from "./Screen";

const Dashboard = () => {
    let {path} = useRouteMatch();

    return(
        <AdminLayout>
            <h1>Admin</h1>
            <Switch>
                <Route exact path={path}>
                    <div>Welcome</div>
                </Route>
                <Route path={`${path}/:screenId`}>
                    <Screen/>
                </Route>
            </Switch>
        </AdminLayout>
    )
}

export default Dashboard