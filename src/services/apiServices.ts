import transport from "../common/http";
import { Launches, TCompaniesInfo } from "../viewModels/types";
const DEBUG = process.env.NODE_ENV === "development";
export class ApiService {
  apiKey: string | undefined = process.env.REACT_APP_SPACE_X_API;
  transport = transport();
  async getCompaniesData() {
    this.transport.interceptors.request.use(
      (config) => {
        if (DEBUG) {
          console.info("Request to", config.url);
        }
        return config;
      },
      (error) => {
        if (DEBUG) {
          console.error("The error from the request", error);
        }
        return Promise.reject(error);
      }
    );
    const { data } = await this.transport.get<TCompaniesInfo>(
      `${this.apiKey}/company`
    );

    return data;
  }

  async getLaunches() {
    const response = await this.transport.get<Launches[]>(
      `${this.apiKey}/launches`
    );

    return response;
  }
}
