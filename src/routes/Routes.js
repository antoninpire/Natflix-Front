import React from "react";
import { Route, Redirect } from "react-router-dom";

const userStorage = localStorage.getItem("user");
let user;
if (userStorage) {
  user = JSON.parse(userStorage);
}
const hasToken = localStorage.getItem("token");
const condition = hasToken && user;

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!condition) {
        return <Redirect to="/" />;
      }
      return <Component {...props} />;
    }}
  />
);

export const PublicRoute = (props) => {
  return (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};
