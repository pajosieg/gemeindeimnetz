const apiUrls = {
  prod: 'https://vpf31jl656.execute-api.eu-central-1.amazonaws.com/prod',
  dev: 'https://ly1bd4rpe3.execute-api.eu-central-1.amazonaws.com/dev',
};

const getApiUrl = () => {
  const hostName = window.location.hostname;
  if (hostName === 'www.gemeinde-im-netz.de' || hostName === 'gemeinde-im-netz.de') {
    return apiUrls.prod;
  }
  return apiUrls.dev;
};

export default {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,

    // OPTIONAL - Hosted UI configuration
    // oauth: {
    //   domain: "https://gemeinde-im-netz.auth.eu-central-1.amazoncognito.com",
    //   scope: ["openid"],
    //   redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
    //   redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
    //   responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    // }
  },
  API: {
    endpoints: [
      {
        name: 'gemeinde-im-netz-api',
        endpoint: getApiUrl(),
      },
    ],
  },
};
