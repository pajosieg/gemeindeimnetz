class Authentication {
  private subscribers: ((state: any) => void)[] = []
  private state = {
    authenticated: false,
    user: null,
  }

  subscribe = (subscriber: (state: any) => void) => {
    this.subscribers.push(subscriber)
  }

  unsubscribe = (subscriber: (state: any) => void) => {
    const subscriberIndex = this.subscribers.findIndex(subscriber)
    this.subscribers.splice(subscriberIndex, 1)
  }

  authenticate = (user: any) => {
    console.log('add user to authentication store', user)
    this.state = {
      user: user,
      authenticated: true,
    }
    this.emitChanges()
  }

  logout = () => {
    console.log('remove user from authentication store')
    this.state = {
      user: null,
      authenticated: false,
    }
    this.emitChanges()
  }

  getUser = () => (this.state.authenticated ? this.state : null)

  private emitChanges = () => {
    this.subscribers.forEach((subscriber) => subscriber(this.state))
  }
}

export default new Authentication()
