import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Bistum } from "./components/Bistum/Bistum";
import { Home } from "./components/Home/Home";
import { Germany } from "./components/Germany/Germany";
import { User } from "./components/User/User";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={User} />
        <Route path="/germany" component={Germany} />
        <Route path="/*:bistum" component={Bistum} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
