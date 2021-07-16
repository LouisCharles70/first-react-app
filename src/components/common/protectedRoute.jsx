import {Redirect, Route} from "react-router-dom";
import {getCurrentUser} from "../../services/authService";
import React from "react";

export const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
   return (<Route
      path={path}
      {...rest}
      render={props => {
         if(!getCurrentUser()) return <Redirect to={{
            pathname: "/login",
            state: {from: props.location}
         }}/>

         return Component
            ? <Component {...props}/>
            : render(props);
      }}/>);
};
