import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

export interface IPrivateRouteProps extends RouteProps {
    is_auth: boolean; // is authenticate route
    redirect_path: string; // redirect path if don't authenticate route
}

const PrivateRoute: React.FC<IPrivateRouteProps> = props => {
    return props.is_auth ? (
        <Route {...props} component={props.component} render={undefined} />
    ) : (
        <Redirect to={{ pathname: props.redirect_path }} />
    );
};

export default PrivateRoute;
