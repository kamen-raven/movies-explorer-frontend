import React from "react";
import { Route, Redirect } from "react-router-dom";

import Preloader from '../Preloader/Preloader';
import './ProtectedRoute.css';

const ProtectedRoute = ({ isAuthChecking, isLoggedIn, path, children }) => {
  return (
    <Route path={path} exact>
      { isAuthChecking ? (
        <main className='content'>
          <Preloader />
        </main>
      ) : (
        isLoggedIn ? children : <Redirect exact to="/" />
      )}
    </Route>
)}

export default ProtectedRoute;


/*
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect exact to="/" />
      }
    </Route>
  );
};
 */
