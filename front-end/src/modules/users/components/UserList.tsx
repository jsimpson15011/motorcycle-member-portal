import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getUser} from "../selectors";
import * as t from "../actions"
import {IUser} from "../model";
import { DataGrid, GridColDef, GridCellParams } from '@material-ui/data-grid'
import {Button} from "@material-ui/core";
import {Link, useParams, useRouteMatch} from "react-router-dom";

const UserList = ({users, dispatch}: { users: {users: IUser[]}, dispatch: any }) => {
    let {url} = useRouteMatch()
    const {action, id} = useParams<{
        action: string,
        id: string,
        screenId: string
    }>()
    url = url.replace("/" + action, '').replace("/" + id, '')

    useEffect(() => {
        dispatch(t.fetchUser())
    },[dispatch])

    if (!users.users){
        return (
            <div>
                Loading
            </div>
        )
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'userName', headerName: 'User Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: "",
            headerName: "Edit",
            disableClickEventBubbling: true,
            renderCell: (params: GridCellParams) => {
                return <Link to={`${url}/edit/${params.getValue("id")}`}><Button>Edit User</Button></Link>;
            }
        }
    ]

    const userRows = users.users.map(user =>{
        return(
            {
                id: user.id,
                userName: user.userName,
                email: user.email,
                editUser: <a href={"/users/edit/"+user.id}>test</a>
            }
        )
    })

    return(
        <div className="user-table">
            <DataGrid autoHeight rowHeight={100} columnBuffer={0} rows={userRows} columns={columns} pageSize={20}/>
        </div>
    )
}

export default connect(
    createStructuredSelector({
        users: getUser
    })
)(UserList)