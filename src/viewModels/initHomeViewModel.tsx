import React from "react";
import { API_SERVICE_KEY, HOME_SERVICE_KEY } from "../constants/application";
import { ApiService } from "../services/apiServices";
import { Home } from "../view/Home";
import { HomeViewModel } from "./homeViewModel";

export function initializeHome(application: Common.IApplication) {
  application
    .registerService(API_SERVICE_KEY, () => new ApiService())
    .registerService(
      HOME_SERVICE_KEY,
      (app) => new HomeViewModel(app.getService(API_SERVICE_KEY))
    )
    .registerFeature({
      key: "home",
      label: "Home",
      path: "/",
      getView: () => <Home />,
    });
  return application;
}
