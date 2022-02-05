import BaseService from "./base";

export default class TeamsService extends BaseService {
  static get endpoint() {
    return "teams";
  }

  static fetchById(id, params) {
    return this.api.get(`${this.endpoint}/${id}`, { params });
  }

  static fetchMatches(id, params) {
    return this.api.get(`${this.endpoint}/${id}/matches`, { params });
  }
}
