import { Auth } from 'aws-amplify';
import Authentication from '../stores/Authentication';
import colors from '../scss/_colors.scss';

export class AuthenticationService {
  public static getToken = async () => {
    let token = '';
    try {
      token = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
    } catch (e) {
      console.error(e);
    }
    return token;
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
