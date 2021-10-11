import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import jwt_decode, { JwtPayload } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/authentication/authentication.actions";

import store from "./store/store";

import Header from "./components/layout/Header";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import TermEntryList from './views/gallery/TermEntryList';
import TermEntrySave from './views/termEntries/TermEntrySave';
import TermEntryEdit from './views/termEntries/TermEntryEdit';
import Game from './views/game/Game';
import SelectionSave from './views/selection/SelectionSave';
import AlphaSort from './views/game/alpha-sort/AlphaSort';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode<JwtPayload>(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp! < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== '/game' && location.pathname !== '/selection' && location.pathname !== '/game/alpha-sort') {
      dispatch({ type: 'unselectAllWords' });
      dispatch({ type: 'selections/unselectSelection' });
      dispatch({ type: 'game/setGameTitle', payload: '' });
    }
  }, [location]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/game" component={Game} />
        <PrivateRoute exact path="/game/alpha-sort" component={AlphaSort} />
        <>
          <Header />
          <PrivateRoute exact path="/selection" component={SelectionSave} />
          <PrivateRoute exact path="/list" component={TermEntryList} />
          <PrivateRoute exact path="/upload" component={TermEntrySave} />
          <PrivateRoute exact path="/edit" component={TermEntryEdit} />
        </>
      </Switch>
    </div>
  );
}

export default App;
