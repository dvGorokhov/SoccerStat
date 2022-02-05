import BaseService from "./base";

export default class CompetitionsService extends BaseService {
  static get endpoint() {
    return "competitions";
  }

  static fetchAll() {
    const params = {
      plan: "TIER_ONE",
    };
    return this.api.get(this.endpoint, { params });
  }

  static fetchById(id, params) {
    return this.api.get(`${this.endpoint}/${id}`, { params });
  }

  static fetchTeams(id, params) {
    return this.api.get(`${this.endpoint}/${id}/teams`, { params });
  }

  static fetchMatches(id, params) {
    return this.api.get(`${this.endpoint}/${id}/matches`, { params });
  }
}
