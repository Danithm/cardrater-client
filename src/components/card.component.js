import React, { useState, useEffect } from "react";
import CardsDataService from "../services/cards.service";

//Also need to add rating system along-side comment
//Need to add comment display for other comments and ratings
//Change author section to pull from currently logged in user
//Need image api for card art
//Remove author option, auth check for current user or force login
const Card = props => {
  const initialCardState = {
    id: null,
    author: "",
    comment: "",
    published: false
  };
  const [comment, setComment] = useState(initialCardState);
  const [currentCard, setCurrentCard] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const getCard = id => {
    CardsDataService.get(id)
      .then(response => {
        setCurrentCard(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCard(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]:value});
  };

  const saveComment = () => {
    var data = {
      author: comment.author,
      comment: comment.comment
    };

    CardsDataService.create(data)
      .then(response => {
        setComment({
          author: response.data.author,
          comment: response.data.comment,
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
    CardsDataService.update(currentCard.id, comment)
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
              id="author"
              required
              value={comment.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              className="form-control"
              id="comment"
              required
              value={comment.comment}
              onChange={handleInputChange}
              name="comment"
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