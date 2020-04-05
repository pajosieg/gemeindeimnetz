import { Auth } from 'aws-amplify'
import Authentication from '../Stores/Authentication'

export class AuthenticationService {
  public static getToken = async () => {
    let token = ''
    try {
      token = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    } catch (e) {
      console.error(e)
    }
    return token
  }

  public static getCognitoId = () =>
    (Authentication.getUser()?.user as any)?.attributes.sub
}
