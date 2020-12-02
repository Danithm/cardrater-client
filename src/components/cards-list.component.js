import React, { useState, useEffect } from "react";
import CardDataService from "../services/cards.service";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";

//Need to expand search options, best if collapsable
//Probably similar style to gatherer
const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCardName, setSearchCardName] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageSizes = [10, 15, 20];

  const retrieveCards = () => {
    const params = getRequestParams(searchCardName, page, pageSize);
    CardDataService.getAll(params)
      .then(response => {
        const { cards, totalPages } = response.data;
        setCards(cards);
        setCount(totalPages);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(retrieveCards, [page, pageSize]);

  const onChangeSearchCardName = e => {
    const searchCardName = e.target.value;
    setSearchCardName(searchCardName);
  };

  const getRequestParams = (searchCardName, page, pageSize) => {
    let params = {};

    if (searchCardName) {
      params["cardName"] = searchCardName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const setActiveCard = (card, index) => {
    setCurrentCard(card);
    setCurrentIndex(index);
    setImgSrc("https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=" + card.multiverseId)
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
              onClick={retrieveCards}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Cards List</h4>

        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

        <ul className="list-group">
          {cards &&
            cards.map((card, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCard(card, index)}
                key={index}
              >
                {card.cardName}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentCard ? (
          <div className="card-box">
            <h4>Card</h4>
            <img src = {imgSrc} />
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
              className="btn btn-warning"
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