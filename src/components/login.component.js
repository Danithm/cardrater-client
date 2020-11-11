import React, { Component } from "react";
import CardsDataService from "../services/cards.service";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          currentUser: {
            userName: "",
            password: ""
          }
        };
    }

    

    onChangeUser(e) {
        const userName = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentUser: {
              ...prevState.currentUser,
              userName: userName
            }
          };
        });
    }

    onChangePassword(e) {
        const password = e.target.value;
        
        this.setState(prevState => ({
          currentCard: {
            ...prevState.currentUser,
            password: password
          }
        }));
    }

    loginUser(status) {
        var data = {
          userName: this.state.currentUser.userName,
          password: this.state.currentUser.password,
          registered: status
        };
    
        CardsDataService.login(this.state.currentUser.userName, data)
          .then(response => {
            this.setState(prevState => ({
              currentUser: {
                ...prevState.currentUser,
                registered: status
              }
            }));
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

  render (){
    const { currentUser } = this.state;

    return (
        <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>Login</h4>
            <form>
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  value={currentUser.userName}
                  onChange={this.onChangeUser}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
                  onChange={this.onChangePassword}
                />
              </div>
            </form>

            {currentUser.registered ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.loginUser(false)}
              >
                Login
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.loginUser(true)}
              >
                Register
              </button>
            )}
            </div>
        ) : (
          <div>
            <br />
            <p>User: {currentUser.userName} already logged in.</p>
          </div>
        )}
      </div>
    );
  }
}