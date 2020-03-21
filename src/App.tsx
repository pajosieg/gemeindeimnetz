import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import GermanMap from "./components/map/GermanMap";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/germany" render={() => <h1>germany</h1>}></Route>
        <Route path="/*:bistum" render={() => <h1>bistum</h1>}></Route>
        <Route
          path="/"
          render={() => (
            <div className="App">
              <header className="App-header">
                <h1>Gemeinde im Netz</h1>
                <div className="choose-entry">
                  <GermanMap />
                  <div className="all-bistums">
                    <Link to="germany">
                      <h2>Ganz Deutschland</h2>
                    </Link>
                  </div>
                </div>
              </header>
            </div>
          )}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
