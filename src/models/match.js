import moment from "moment";
export default class Match {
  /**
   * Создание новой модели Match
   *
   * @param {object} props - свойства объекта
   * @param {number} id - идентификатор лиги
   * @param {string} awayTeam - код лиги
   * @param {string} homeTeam - имя лиги
   * @param {string} status - имя лиги
   * @param {string} score - имя лиги
   * @param {string} matchDay - имя лиги
   *  */

  constructor(props) {
    this.id = props.id;
    this.awayTeam = props.awayTeam;
    this.homeTeam = props.homeTeam;
    this.status = props.status;
    this.score = props.score;
    this.matchDay = props.matchDay;
  }

  static FromApi(data) {
    return new Match({
      id: data.id,
      awayTeam: data.awayTeam,
      homeTeam: data.homeTeam,
      status: data.status,
      score: data.score?.fullTime,
      matchDay: moment(data.utcDate).format("DD.MM.YYYY"),
    });
  }

  get homeTeamName() {
    return this.homeTeam.name;
  }

  get awayTeamName() {
    return this.awayTeam.name;
  }

  get matchOpen() {
    return this.status === "FINISHED" ? false : true;
  }
}
