import React from 'react';
import AppNavbar from './components/AppNavbar'
import { BrowserRouter as Router, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar/>
      </div>
    </Router>
  );
}

export default App;
