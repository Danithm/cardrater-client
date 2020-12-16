import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

//Per user comment retrival not implemented 
const Profile = () => {
  const currentUser = AuthService.getCurrentUser()
  const [allComments, setAllComments] = useState([]);

  const retrieveComments = username => {
    AuthService.getCommentsByUser(username)
      .then(response => {
        setAllComments(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveComments(currentUser.username);
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      
    </div>
  );
};

export default Profile;