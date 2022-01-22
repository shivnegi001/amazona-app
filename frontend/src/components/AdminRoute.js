import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({children}) => {
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />
}

export default AdminRoute;