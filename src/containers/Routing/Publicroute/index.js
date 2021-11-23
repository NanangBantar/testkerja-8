import React from "react";
import { Redirect, Route } from "react-router-dom";

const Publicroute = ({ component: Component, ...restOfProps }) => {
    const isAuthenticated = localStorage.getItem("token");
    
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Redirect to="/Admin" /> : <Component {...props} />
            }
        />
    )
};

export default Publicroute;