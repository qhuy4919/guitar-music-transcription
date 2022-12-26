import React, {useState, useEffect} from 'react'
import { Navigate, Route } from 'react-router-dom';
export const PrivateRoute = ({ component: Component, ...rest }) => {
    return localStorage.getItem('jwt') != null ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login"/>
    )
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem('jwt') != null ? (
                    <Component {...props} />
                ) : (
                    <Navigate to={{ pathname: 'login', state: { from: props.location } }} />
                )
            }
        />
    )
}
