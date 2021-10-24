import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
