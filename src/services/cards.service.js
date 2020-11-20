import http from "../http-common";


//Might need to handle path for commenting differently

  const getAll = () => {
    return http.get("/cards");
  };

  //TODO:Handle other search params
  const findByName = (cardName) => {
    return http.get(`/cards?cardName=${cardName}`);
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
  findByName,
  create,
  update,
  remove
};