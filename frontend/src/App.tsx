import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Bistum } from "./components/Bistum/Bistum";
import { Home } from "./components/Home/Home";
import { Germany } from "./components/Germany/Germany";
import { CommunityOverview } from "./components/CommunityOverview/CommunityOverview";
import { Header } from "./components/Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/community" component={CommunityOverview} />
          <Route path="/germany" component={Germany} />
          <Route path="/*:bistum" component={Bistum} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
