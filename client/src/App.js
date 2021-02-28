import React, { Component, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";

import Header from "./components/layout/Header";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import FilesList from './components/files-list/FilesList';
import FileUpload from './components/file-upload/FileUpload';
import WordEdit from './components/word-edit/WordEdit';
import Game from './components/game/Game';
import SelectionSave from './components/selection/SelectionSave';

import 'bootstrap/dist/css/bootstrap.min.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== '/game' && location.pathname !== '/selection') {
      dispatch({ type: 'words/unselectAllWords' });
    }
  }, [location]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/game" component={Game} />
        <>
          <Header />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/selection" component={SelectionSave} />
          <PrivateRoute exact path="/list" component={FilesList} />
          <PrivateRoute exact path="/upload" component={FileUpload} />
          <PrivateRoute exact path="/edit" component={WordEdit} />
        </>
      </Switch>
    </div>
  );
}

export default App;
