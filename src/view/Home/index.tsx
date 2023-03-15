import { observer } from "mobx-react";
import * as React from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
export const Home = observer(() => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
});
