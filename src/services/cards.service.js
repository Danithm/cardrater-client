import http from "../http-common";


//Might need to handle path for commenting differently
//Params is to shape paging data
  const getAll = () => {
    return http.get("/cards");
  };

  const getComments = (cardID) => {
    return http.get(`/cards/${cardID}`);
  };

  //TODO:Handle other search params
  const findByName = (cardName) => {
    return http.get(`/cards?cardName=${cardName}`);
  };

  const getByID = (cardID) => {
    return http.get(`/cards/${cardID}`);
  };

  const create = (comment) => {
    return http.put(`/cards/:cardID/${comment}`);
  };

  const update = (comment) => {
    return http.put(`/cards/:cardID/${comment}`);
  };

  const remove = (comment) => {
    return http.delete(`/cards/:cardID/${comment}`);
  };

export default {
  getAll,
  getComments,
  getByID,
  findByName,
  create,
  update,
  remove
};