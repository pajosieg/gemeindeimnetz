import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { CommunityOverview } from './components/Community/CommunityOverview';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-body">
        <Header />
        <div className="wrapper">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/community" component={CommunityOverview} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
