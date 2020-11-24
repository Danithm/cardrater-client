import React, { useState, useEffect } from "react";
import CardsDataService from "../services/cards.service";

//Need to add comment display for other comments and ratings
//Change author section to pull from currently logged in user
//Need image api for card art
//auth check for current user or force login
const Card = props => {
  const initialCommentState = {
    cardID: null,
    username: "",
    text: "",
    rating: "",
    published: false
  };
  //Might need to reshape data
  //Currently going for minimalism
  const initialCardState = {
    cardID: null,
    cardName: "",
    cardText: "",
    multiverseId: ""
  };
  const [comment, setComment] = useState(initialCommentState);
  const [allComments, setAllComments] = useState([]);
  const [currentCard, setCurrentCard] = useState(initialCardState);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const getCard = cardID => {
    CardsDataService.getByID(cardID)
      .then(response => {
        setCurrentCard(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCard(props.match.params.cardID);
  }, [props.match.params.cardID]);

  //Needs data service function
  const retrieveComments = () => {
    CardsDataService.getComments(currentCard.cardID)
      .then(response => {
        setAllComments(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    retrieveComments();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]:value});
  };

  const saveComment = () => {
    var data = {
      username: comment.username,
      text: comment.text,
      rating: comment.rating,
      cardID: currentCard.cardID
    };

    CardsDataService.create(data)
      .then(response => {
        setComment({
          username: response.data.username,
          text: response.data.text,
          rating: response.data.rating,
          cardID: response.data.cardID
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newComment = () => {
    setComment(initialCommentState);
    setSubmitted(false);
  };
//Might need to adjust comment changes
//to send currentComment.id
  const updateComment = () => {
    CardsDataService.update(comment)
      .then(response => {
        console.log(response.data);
        setMessage("The comment was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteComment = () => {
    CardsDataService.remove(comment)
      .then(response => {
        console.log(response.data);
        props.history.push("/cards");
      })
      .catch(e => {
        console.log(e);
      });
  };
//Need to adjust this to display card data above comment area
//https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${card.identifiers.multiverseId}
    return (
      <div>
      {currentCard ? (
        <div>
        <h4>Card</h4>
        <div>
          <label>
            <strong>Name:</strong>
          </label>{" "}
          {currentCard.cardName}
        </div>
        <div>
          <label>
            <strong>Description:</strong>
          </label>{" "}
          {currentCard.cardText}
        </div>
        {submitted ? (
        <div>
          <h4>You commented successfully!</h4>
          <button className="btn btn-success" onClick={newComment}>
            Add
          </button>
          <button className="badge badge-danger mr-2" onClick={deleteComment}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateComment}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="author">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={comment.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              className="form-control"
              id="text"
              required
              value={comment.text}
              onChange={handleInputChange}
              name="text"
            />
          </div>
          <button onClick={saveComment} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
      <h4>Comments</h4>

      <ul className="list-group">
        {allComments.map((comment) => (
            <li key={comment.id}> 
            <label htmlFor="username">Username: </label>{comment.username}
            <label htmlFor="displaycomment">Comment: </label>{comment.text}
            </li>
          ))}
      </ul>
    </div>
    ) : (
      <div>
        <br />
          <p>Please click on a Card...</p>
      </div>
      )}
    </div>
    );
  };
export default Card;