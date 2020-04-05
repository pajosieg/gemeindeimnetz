import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { CommunityOverview } from './components/Community/CommunityOverview';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/community" component={CommunityOverview} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
