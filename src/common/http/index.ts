import axios from "axios";
import { SomeObject } from "../types/SomeObject";

function transport(headers?: SomeObject<string>) {
  const client = axios.create({
    timeout: 4000,
    headers: {
      ...headers,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  });
  return client;
}

export default transport;
