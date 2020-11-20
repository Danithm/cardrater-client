import React, { useState, useEffect } from "react";
import CardDataService from "../services/cards.service";
import { Link } from "react-router-dom";

//Need to expand search options, best if collapsable
//Probably similar style to gatherer
const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCardName, setSearchCardName] = useState("");

  useEffect(() => {
    retrieveCards();
  }, []);

  const onChangeSearchCardName = e => {
    const searchCardName = e.target.value;
    setSearchCardName(searchCardName);
  };

  const retrieveCards = () => {
    CardDataService.getAll()
      .then(response => {
        setCards(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCards();
    setCurrentCard(null);
    setCurrentIndex(-1);
  };

  const setActiveCard = (card, index) => {
    setCurrentCard(card);
    setCurrentIndex(index);
  };

  const findByName = () => {
    CardDataService.findByName(searchCardName)
      .then(response => {
        setCards(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
    return (
      <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchCardName}
            onChange={onChangeSearchCardName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
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
            cards.map((cards, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCard(cards, index)}
                key={index}
              >
                {cards.cardName}
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
                <strong>Description:</strong>
              </label>{" "}
              {currentCard.cardText}
            </div>

            <Link
              to={"/cards/" + currentCard.cardID}
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
  };
export default CardsList;