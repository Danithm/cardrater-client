import React, { Component } from "react";
import CardsDataService from "../services/cards.service";

//Also need to add rating system along-side comment
//Need to add comment display for other comments and ratings
//Change author section to pull from currently logged in user
//Need image api for card art
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.getCard = this.getCard.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);

    this.state = {
      currentCard: {
        cardName: null,
        author: "",
        comment: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCard(this.props.match.params.cardName);
  }

  onChangeAuthor(e) {
    const author = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCard: {
          ...prevState.currentCard,
          author: author
        }
      };
    });
  }

  onChangeComment(e) {
    const comment = e.target.value;
    
    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        comment: comment
      }
    }));
  }

  getCard(cardName) {
    CardsDataService.get(cardName)
      .then(response => {
        this.setState({
          currentCard: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateComment(status) {
    var data = {
      cardName: this.state.currentCard.cardName,
      author: this.state.currentCard.author,
      comment: this.state.currentCard.comment,
      published: status
    };

    CardsDataService.update(this.state.currentCard.comment, data)
      .then(response => {
        this.setState(prevState => ({
          currentCard: {
            ...prevState.currentCard,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
//Need to adjust this to delete the comment and not the card
  deleteComment() {    
    CardsDataService.delete(this.state.currentCard.comment)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cards/:cardName/')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCard } = this.state;

    return (
      <div>
        {currentCard ? (
          <div className="edit-form">
            <h4>Card</h4>
            <form>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentCard.author}
                  onChange={this.onChangeAuthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <input
                  type="text"
                  className="form-control"
                  id="comment"
                  value={currentCard.comment}
                  onChange={this.onChangeComment}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCard.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCard.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateComment(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateComment(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteComment}
            >
              Delete
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Card...</p>
          </div>
        )}
      </div>
    );
  }
}