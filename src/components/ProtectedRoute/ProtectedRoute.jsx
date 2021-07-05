import React from "react";
import { Route, Redirect } from "react-router-dom";

import Preloader from '../Preloader/Preloader';
import './ProtectedRoute.css';

/* const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? <Component {...props} /> : <Redirect exact to="/" />
      }
    </Route>
  );
}; */

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


