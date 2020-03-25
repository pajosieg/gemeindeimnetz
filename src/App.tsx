import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Bistum } from "./components/Bistum/Bistum";
import { Home } from "./components/Home/Home";
import { Germany } from "./components/Germany/Germany";
import { Community } from "./components/Community/Community";
import { Header } from "./components/Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/community" component={Community} />
          <Route path="/germany" component={Germany} />
          <Route path="/*:bistum" component={Bistum} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
