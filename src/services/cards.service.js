import http from "../http-common";


//Might need to handle path for commenting differently
//Params is to shape paging data
//getAll handles name string search, or returns all if string null
  const getAll = (params) => {
    return http.get("/cards", {params});
  };

  const getComments = cardID => {
    return http.get(`/cards/${cardID}/comments`);
  };

  const getByID = (cardID) => {
    return http.get(`/cards/${cardID}`);
  };

  const create = comment => {
    return http.post("/cards/:cardID", comment);
  };

  const update = (commentID, comment) => {
    return http.put(`/cards/:cardID/comments/${commentID}`, comment);
  };

  const remove = commentID => {
    return http.delete(`/cards/:cardID/comments/${commentID}`);
  };

export default {
  getAll,
  getComments,
  getByID,
  create,
  update,
  remove
};