import transport from "../common/http";
import { TPost } from "../viewModels/types";
const DEBUG = process.env.NODE_ENV === "development";
export class ApiService {
  transport = transport();
  async getPosts() {
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
    const { data } = await this.transport.get<any, { data: TPost[] }>(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return data;
  }
}
