import React, { useState, useEffect } from "react";
import CardsDataService from "../services/cards.service";
import AuthService from "../services/auth.service";


//Need to add comment display for other comments and ratings
//Change author section to pull from currently logged in user
//Need image api for card art
//auth check for current user or force login
const Card = props => {
  const initialCardState = {
    cardID: null,
    username: "",
    text: "",
    rating: "",
    published: false
  };
  const [comment, setComment] = useState(initialCardState);
  const [currentCard, setCurrentCard] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const getCard = cardID => {
    CardsDataService.get(cardID)
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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]:value});
  };

  const saveComment = () => {
    var data = {
      username: comment.username,
      text: comment.text,
      rating: comment.rating
    };

    CardsDataService.create(data)
      .then(response => {
        setComment({
          username: response.data.username,
          text: response.data.text,
          rating: response.data.rating,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newComment = () => {
    setComment(initialCardState);
    setSubmitted(false);
  };

  const updateComment = () => {
    CardsDataService.update(currentCard.cardID, comment)
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
      <div className="submit-form">
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
            <label htmlFor="author">Author</label>
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
    </div>
    );
  };
export default Card;