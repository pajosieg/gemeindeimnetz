import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { CommunityOverview } from './components/Community/CommunityOverview';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import CookieConsent from 'react-cookie-consent';
import colors from './scss/_colors.scss';
import { Button } from './components/Button/Button';

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
      <Footer />
      <CookieConsent
        onDecline={() => null}
        location="none"
        buttonText="Accept"
        cookieName="cookieLayer"
        style={{
          backgroundColor: 'rgba(80, 80, 80, 0.9',
          bottom: '42px',
          color: colors.white,
        }}
        disableButtonStyles={true}
        buttonStyle={{ margin: '10px 30px 10px' }}
        ButtonComponent={Button}
        expires={150}
      >
        This website uses cookies to enhance the user experience. You have to allow
        all cookies to use this website.
      </CookieConsent>
    </BrowserRouter>
  );
};

export default App;
