import http from "../http-common";


//Might need to handle path for commenting differently

  const getAll = () => {
    return http.get("/cards");
  };

  const login = (userName, data) => {
    return http.post(`/login/${userName}`, data);
  };

  //TODO:Handle other search params
  const findByName = (cardName) => {
    return http.get(`/cards?cardName=${cardName}`);
  };

  const create = (comment) => {
    return http.put(`/cards/:cardName/${comment}`);
  };

  const update = (sessionKey, comment) => {
    return http.put(`/cards/:cardName/${comment}`, sessionKey);
  };

  const remove = (sessionKey, comment) => {
    return http.delete(`/cards/:cardName/${comment}`, sessionKey);
  };



export default {
  getAll,
  login,
  findByName,
  create,
  update,
  remove
};