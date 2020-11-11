import http from "../http-common";


//Might need to handle path for commenting differently

class CardsDataService {
  getAll() {
    return http.get("/cards");
  }

  login(userName, data) {
    return http.post(`/login/${userName}`, data);
  }

  //TODO:Handle other search params
  findByName(cardName) {
    return http.get(`/cards?cardName=${cardName}`);
  }

  create(comment) {
    return http.put(`/cards/:cardName/${comment}`);
  }

  update(sessionKey, comment) {
    return http.put(`/cards/:cardName/${comment}`, sessionKey);
  }

  delete(sessionKey, comment) {
    return http.delete(`/cards/:cardName/${comment}`, sessionKey);
  }

}

export default new CardsDataService();