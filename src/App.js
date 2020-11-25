import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Cards from "./components/card.component";
import CardsList from "./components/cards-list.component";


const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

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
            {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/cards"]} component={CardsList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/cards/:cardID" component={Cards} />
            <Route path="/cards/:cardID/comments" component={Cards} />
          </Switch>
        </div>
      </div>
    );
  }

export default App;
