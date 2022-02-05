export default class Competition {
  /**
   * Создание новой модели Competition
   *
   * @param {object} props - свойства объекта
   * @param {number} id - идентификатор лиги
   * @param {string} code - код лиги
   * @param {string} name - имя лиги
   * @param {string} imgUrl - логотип лиги
   *  */

  constructor(props) {
    this.id = props.id;
    this.code = props.code;
    this.name = props.name;
    this.imgUrl = props.imgUrl;
  }

  static FromApi(data) {
    return new Competition({
      id: data.id,
      code: data.code,
      name: data.name,
      imgUrl: require(`@/assets/logo/${data.code}.png`),
    });
  }
}
