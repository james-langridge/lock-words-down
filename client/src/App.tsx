import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import jwt_decode, { JwtPayload } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/authentication/authentication.actions";
import axios from 'axios';
import { TermEntry, Selection } from './types/terms.types';

import store from "./store/store";

import Header from "./components/layout/Header";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import TermEntryList from './views/termEntries/TermEntryList';
import TermEntrySave from './views/termEntries/TermEntrySave';
import TermEntryEdit from './views/termEntries/TermEntryEdit';
import Game from './views/game/Game';
import SelectionSave from './views/selection/SelectionSave';
import AlphaSort from './views/game/alpha-sort/AlphaSort';
import StudentSave from "./views/students/StudentSave";
import StudentsManage from "./views/students/StudentsManage";
import StudentEdit from "./views/students/StudentEdit";

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
  const userId = useAppSelector((state) => state.auth.user.id);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const dispatch = useAppDispatch();

  const getTermEntries = async () => {
    try {
      const { data } = await axios.get<TermEntry[]>(`term/all/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'setWordList', payload: data })
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const getSelections = async () => {
    try {
      const { data } = await axios.get<Selection[]>(`selection/${userId}`);
      setErrorMsg('');
      if (data) {
        dispatch({ type: 'selections/setSelectionList', payload: data });
      }
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const getStudents = async () => {
    try {
      const { data } = await axios.get(`students/all/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'setStudentList', payload: data })
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  useEffect(() => {
      getTermEntries();
      getSelections();
      getStudents();
  }, []);

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
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <PrivateRoute exact path="/selection" component={SelectionSave} />
          <PrivateRoute exact path="/list" component={TermEntryList} />
          <PrivateRoute exact path="/upload" component={TermEntrySave} />
          <PrivateRoute exact path="/edit" component={TermEntryEdit} />
          <PrivateRoute exact path="/students/save" component={StudentSave} />
          <PrivateRoute exact path="/students/manage" component={StudentsManage} />
          <PrivateRoute exact path="/students/edit" component={StudentEdit} />
        </>
      </Switch>
    </div>
  );
}

export default App;
