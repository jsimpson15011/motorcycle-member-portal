import React from "react";
import Header from "./components/Header";

const AdminLayout = ({children, ...rest}:{children: JSX.Element[] | JSX.Element}) => {
    return(
        <div>
            <Header/>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout