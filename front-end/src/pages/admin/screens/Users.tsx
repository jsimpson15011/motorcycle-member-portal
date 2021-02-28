import React from "react"
import UserList from "../../../modules/users/components/UserList";
import {useParams} from "react-router-dom";

const Users = () => {
    const {action, id} = useParams<{
        action: string,
        id: string,
        screenId: string
    }>()

    if (action === "edit"){
        return (
            <div>
                <h2>User</h2>
                <div>
                    {id}
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2>Users</h2>
            <UserList/>
        </div>
    )
}

export default Users