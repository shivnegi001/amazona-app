import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({children}) => {
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    return userInfo ? children : <Navigate to="/signin" />
}

export default PrivateRoute;