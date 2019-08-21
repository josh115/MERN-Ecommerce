import React from 'react';
import AppNavbar from './components/AppNavbar';
import ItemsList from './components/ItemsList';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppNavbar/>
        <Switch>
          <Route path="/" exact component={ItemsList}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
