import { Auth } from 'aws-amplify';
import Authentication from '../storesS/Authentication';
import colors from '../scss/_colors.scss';
import { CognitoIdToken, CognitoUserSession } from 'amazon-cognito-identity-js';

export class AuthenticationService {
  public static getToken = async () => {
    const idToken = await AuthenticationService.getTokenOrRefresh();
    return `Bearer ${idToken}`;
  };

  private static getTokenOrRefresh = async () => {
    const signInUserSession = await Auth.currentSession();
    const activeUser = await Auth.currentAuthenticatedUser();
    const idToken: CognitoIdToken = (await Auth.currentSession()).getIdToken();

    if (
      !idToken ||
      (idToken as CognitoIdToken).getExpiration() * 1000 <= Date.now()
    ) {
      if (!signInUserSession.isValid()) {
        const refreshToken = signInUserSession.getRefreshToken();
        return new Promise<string>(resolve => {
          activeUser.refreshSession(
            refreshToken,
            (err: Error, newSession: CognitoUserSession) => {
              if (err) {
                console.error(err);
                resolve(Auth.signOut());
              }
              activeUser.setSignInUserSession(newSession);
              resolve(newSession.getIdToken().getJwtToken());
            }
          );
        });
      }
      return Promise.resolve(idToken.getJwtToken());
    }
    return Promise.resolve((idToken as CognitoIdToken).getJwtToken());
  };

  public static getCognitoId = () =>
    (Authentication.getUser()?.user as any)?.attributes.sub;

  public static getTheme = () => ({
    button: {
      backgroundColor: colors.green,
      fontFamily: "'Poppins', sans-serif",
      textTransform: 'none',
      letterSpacing: 'normal',
      fontSize: '14px',
      padding: '10px 15px',
      fontWeight: '600',
    },
    toast: { backgroundColor: colors.green },
    container: { fontFamily: "'Poppins', sans-serif", color: '#494949' },
    a: { color: colors.green },
  });

  public static getSignUpConfig = () => ({
    hiddenDefaults: ['phone_number'],
  });
}
