import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getUser} from "../selectors";
import * as t from "../actions"
import {IUser} from "../model";
import { DataGrid, GridColDef } from '@material-ui/data-grid'

const UserList = ({users, dispatch}: { users: {users: IUser[]}, dispatch: any }) => {

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
        { field: 'email', headerName: 'Email', width: 200 }
    ]

    const userRows = users.users.map(user =>{
        return(
            {
                id: user.id,
                userName: user.userName,
                email: user.email
            }
        )
    })
    console.log(userRows)

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