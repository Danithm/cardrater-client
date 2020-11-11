import React, { Component } from "react";
import CardDataService from "../services/cards.service";
import { Link } from "react-router-dom";

//Need to expand search options, best if collapsable
//Probably similar style to gatherer
export default class CardsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCardName = this.onChangeSearchCardName.bind(this);
    this.retrieveCards = this.retrieveCards.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCard = this.setActiveCard.bind(this);
    this.searchCardName = this.searchCardName.bind(this);

    this.state = {
      cards: [],
      currentCard: null,
      currentIndex: -1,
      searchCardName: ""
    };
  }

  componentDidMount() {
    this.retrieveCards();
  }

  onChangeSearchCardName(e) {
    const searchCardName = e.target.value;

    this.setState({
      searchCardName: searchCardName
    });
  }

  retrieveCards() {
    CardDataService.getAll()
      .then(response => {
        this.setState({
          cards: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCards();
    this.setState({
      currentCard: null,
      currentIndex: -1
    });
  }

  setActiveCard(card, index) {
    this.setState({
      currentCard: card,
      currentIndex: index
    });
  }

  searchCardName() {
    CardDataService.findByCardName(this.state.searchCardName)
      .then(response => {
        this.setState({
          cards: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchCardName, cards, currentCard, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by card name"
              value={searchCardName}
              onChange={this.onChangeSearchCardName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCardName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Cards List</h4>

          <ul className="list-group">
            {cards &&
              cards.map((card, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCard(card, index)}
                  key={index}
                >
                  {card.cardName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
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
                  <strong>Text:</strong>
                </label>{" "}
                {currentCard.text}
              </div>

              <Link
                to={"/cards/" + currentCard.cardName}
                className="badge badge-warning"
              >
                Comment
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Card...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}