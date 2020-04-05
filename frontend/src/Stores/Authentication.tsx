import { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthenticationState = {
  authenticated: boolean;
  user: CognitoUser | null;
};

type AuthSubscriber = (state: AuthenticationState) => void;

class Authentication {
  private subscribers: AuthSubscriber[] = [];
  private state: AuthenticationState = {
    authenticated: false,
    user: null,
  };

  subscribe = (subscriber: AuthSubscriber) => {
    this.subscribers.push(subscriber);
  };

  unsubscribe = (subscriber: AuthSubscriber) => {
    const subscriberIndex = this.subscribers.findIndex(s => s === subscriber);
    this.subscribers.splice(subscriberIndex, 1);
  };

  authenticate = (user: CognitoUser) => {
    console.log('add user to authentication store', user);
    this.state = {
      user: user,
      authenticated: true,
    };
    this.emitChanges();
  };

  logout = () => {
    console.log('remove user from authentication store');
    this.state = {
      user: null,
      authenticated: false,
    };
    this.emitChanges();
  };

  getUser = () => (this.state.authenticated ? this.state : null);

  private emitChanges = () => {
    this.subscribers.forEach(subscriber => subscriber(this.state));
  };
}

export default new Authentication();
