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
import FilesList from './components/files-list/FilesList';
import FileUpload from './components/file-upload/FileUpload';
import WordEdit from './components/word-edit/WordEdit';
import Game from './components/game/Game';
import SelectionSave from './components/selection/SelectionSave';
import AlphaSort from './components/game/AlphaSort';

import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== '/game' && location.pathname !== '/selection' && location.pathname !== '/alpha-sort') {
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
        <PrivateRoute exact path="/alpha-sort" component={AlphaSort} />
        <>
          <Header />
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
