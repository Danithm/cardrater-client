import React, { useState, useEffect } from "react";
import CardsDataService from "../services/cards.service";

//TODO - Not implemented in final:
//Hide update option if user != username
//Change author section to pull from currently logged in user
//auth check for current user or force login
//Pull comments out as own component to improve readability
const Card = props => {
  const initialCommentState = {
    cardID: null,
    username: "",
    text: "",
    rating: "",
    published: false
  };
  //Currently going for minimalism
  //"minimalism" - as this card component devoles into spaghet
  const initialCardState = {
    cardID: null,
    cardName: "",
    cardText: "",
    multiverseId: ""
  };
  const [comment, setComment] = useState(initialCommentState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [allComments, setAllComments] = useState([]);
  const [currentCard, setCurrentCard] = useState(initialCardState);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const getCard = cardID => {
    CardsDataService.getByID(cardID)
      .then(response => {
        //Needed to extract to object
        //Instead of response.data
        const card = response.data[0];
        setCurrentCard(card);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCard(props.match.params.cardID);
  }, [props.match.params.cardID]);

  const retrieveComments = cardID => {
    CardsDataService.getComments(cardID)
      .then(response => {
        setAllComments(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveComments(props.match.params.cardID);
  }, [props.match.params.cardID]);

  const getImgUrl = () => {
    const multiIDUrl = "https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=" + currentCard.multiverseId;
    setImgSrc(multiIDUrl);
  };

  useEffect(() => {
    getImgUrl();
  });

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
    window.location.reload(false);
  };

  const setActiveComment = (comment) => {
    setComment(comment);
    setCurrentIndex(comment.id);
  };

  const updateComment = () => {
    CardsDataService.update(comment.id, comment)
      .then(response => {
        console.log(response.data);
        setMessage("The comment was updated successfully!");
        window.location.reload(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteComment = () => {
    CardsDataService.remove(comment.id)
      .then(response => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

    return (
      <div>
      {currentCard ? (
        <div>
        <h4>Card</h4>
        <img src = {imgSrc} />
        <div className="cardName">
          Name: {currentCard.cardName}
        </div>
        <div className="cardText">
          Text: {currentCard.cardText}
        </div>

        {submitted ? (
        <div>
          <h4>You commented successfully!</h4>
          <button className="btn btn-success" onClick={newComment}>
            New Comment
          </button>
          <p>{message}</p>
        </div>
        ) : (
        <div className="comment-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
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
            <label htmlFor="rating">Rating(0 - 5):</label>
            <input
              type="range"
              min="0"
              max="5"
              className="form-control"
              id="rating"
              required
              value={comment.rating}
              onChange={handleInputChange}
              name="rating"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
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
          <button className="btn btn-danger mr-2" onClick={deleteComment}>
              Delete
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={updateComment}
            >
              Update
            </button>
        </div>
      )}
      <h4>Comments</h4>

      <ul className="list-group">
        {allComments.map((comment) => (
            <li className={"comment-box" + (comment.id === currentIndex ? "active" : "")} 
            onClick={() => setActiveComment(comment)}
              key={comment.id}> 
            <label htmlFor="username">Username: {comment.username}</label>
            <label htmlFor="displayrating">Rating: {comment.rating}</label>
            <label htmlFor="displaycomment">Comment: {comment.text}</label>
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