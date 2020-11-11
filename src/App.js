import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Cards from "./components/card.component";
import CardsList from "./components/cards-list.component";
import Login from "./components/login.component";

class App extends Component {
  render(){
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            CardRater
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cards"} className="nav-link">
                All Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/highestrated"} className="nav-link">
                Highest Rated - Not implemented
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/cards"]} component={CardsList} />
            <Route path="/cards/:cardName" component={Cards} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
