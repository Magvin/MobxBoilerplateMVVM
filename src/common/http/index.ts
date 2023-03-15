import axios from "axios";
import { SomeObject } from "../types/SomeObject";

function transport(headers?: SomeObject<string>) {
  const client = axios.create({
    timeout: 4000,
    headers: {
      ...headers,
    },
  });
  return client;
}

export default transport;
