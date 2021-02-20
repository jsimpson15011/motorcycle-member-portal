import React from "react";
import {Link} from "react-router-dom";
import AdminLayout from "../../components/AdminLayout/AdminLayout";

const Permission = () => {
    return (
        <AdminLayout>
            <h2>You do not have permission to view this page.</h2>
            <Link to="/login">Please Log Out Here, and Log in with your admin account</Link>
        </AdminLayout>
    )
}

export default Permission