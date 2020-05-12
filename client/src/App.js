import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Terminal from "./components/Terminal";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/NavBar";
import Profile from "./components/Profile";
import Order from "./components/OrderView";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={props => <Register {...props} />} />
              <Route
                exact
                path="/profile"
                render={props => <Profile {...props} />}
              /><Route
              exact
              path="/order"
              render={props => <Order {...props} />}
            />
              <Route exact path="/user" render={props => <Menu {...props} />} />
              <Route
                exact
                path="/cook"
                render={props => <Terminal {...props} />}
              />
              <Route
                exact
                path="/login"
                render={props => <Login {...props} />}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
