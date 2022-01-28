import React from "react";
import { Route, Redirect } from "react-router-dom";
import { constants } from "../constants";

const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
let user;
if (userStorage) {
  user = JSON.parse(userStorage);
}
const hasToken = localStorage.getItem(constants.tokenStorageKey);
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
