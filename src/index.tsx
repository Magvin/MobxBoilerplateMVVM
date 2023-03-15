import { configure } from "mobx";
import { Observer } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Application } from "./common/app/application";
import { AppProvider } from "./common/app/provider";
import "./index.css";
import "./assets/styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import { initializeHome } from "./viewModels/initHomeViewModel";
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});
const application = new Application();
initializeHome(application);

ReactDOM.render(
  <AppProvider application={application}>
    <Observer>
      {() => (
        <BrowserRouter>
          <Routes>
            {application.features.map((feature) => (
              <Route
                key={feature.key}
                path={feature.path}
                element={feature.getView()}
              />
            ))}
          </Routes>
        </BrowserRouter>
      )}
    </Observer>
  </AppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
