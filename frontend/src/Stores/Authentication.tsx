class Authentication {
  private subscribers: ((state: any) => void)[] = [];
  private state = {
    authenticated: false,
    user: null
  };

  subscribe = (subscriber: (state: any) => void) => {
    this.subscribers.push(subscriber);
  };

  unsubscribe = (subscriber: (state: any) => void) => {
    const subscriberIndex = this.subscribers.findIndex(subscriber);
    this.subscribers.splice(subscriberIndex, 1);
  };

  authenticate = (user: any) => {
    this.state = {
      user: user,
      authenticated: true
    };
    this.emitChanges();
  };

  logout = () => {
    this.state = {
      user: null,
      authenticated: false
    };
    this.emitChanges();
  };

  private emitChanges = () => {
    this.subscribers.forEach(subscriber => subscriber(this.state));
  };
}

export default new Authentication();
