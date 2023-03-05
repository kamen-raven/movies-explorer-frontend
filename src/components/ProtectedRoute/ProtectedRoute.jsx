import React from "react";
import { Route, Redirect } from "react-router-dom";

import Preloader from '../Preloader/Preloader';
import './ProtectedRoute.css';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const isLoggedIn =  props.loggedIn || localStorage.getItem('token');

  return (
    <Route path={props.path} exact>
      { props.isAuthChecking ? (
        <main className='protected-route'>
          <Preloader />
        </main>
      ) : (
        isLoggedIn ?  <Component {...props} />  : <Redirect exact to="/" />
      )}
    </Route>
)}

export default ProtectedRoute;


