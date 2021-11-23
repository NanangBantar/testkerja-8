import React from "react";
import { Redirect, Route } from "react-router-dom";

const Privateroute = ({ component: Component, ...restOfProps }) => {
    const isAuthenticated = localStorage.getItem("token");
    
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
};

export default Privateroute;