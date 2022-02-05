import { axiosInstance } from "@/plugins/axios";

export default class BaseService {
  static get api() {
    return axiosInstance;
  }
}
