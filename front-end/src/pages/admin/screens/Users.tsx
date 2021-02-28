import React from "react"
import UserList from "../../../modules/users/components/UserList";
import {useParams, Link, useRouteMatch} from "react-router-dom";
import {Button} from "@material-ui/core";
import UserForm from "../../../modules/users/components/UserForm";

const Users = () => {
    const {action, id} = useParams<{
        action: string,
        id: string,
        screenId: string
    }>()
    let {url} = useRouteMatch()

    if (action === "edit") {
        return (
            <div>
                <h2>User</h2>
                <div>
                    {id}
                </div>
            </div>
        )
    }
    if (action === "add"){
        return(
            <div>
                <UserForm/>
            </div>
        )
    }


    return (
        <div>
            <h2>Users</h2>
            <Button component={Link} to={`${url}/add`} variant="contained" color="primary">Add New User</Button>
            <UserList/>
        </div>
    )
}

export default Users