import React from 'react';
// import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage.js";
import LoginPage from "./components/views/LoginPage/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage/RegisterPage.js";


function App() {
  return (
    <Router>
      {/* <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div> */}
    </Router>
  );
}

export default App;
